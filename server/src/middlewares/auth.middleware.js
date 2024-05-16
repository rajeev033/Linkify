const jwt=require('jsonwebtoken');
const User=require('../models/user.model');
const { apiResponse } = require('../utils/apiResponse');

async function isUserAuthenticated(req, res, next)
{
    try
    {
        const token=req.cookies.accessToken;
        if(!token)
        {
            return res.status(401).json(new apiResponse(401, {}, "user not authenticated"));

        }
        else
        {
            const decodedToken=jwt.verify(token,process.env.tokenSecret || 'opensecret');
            console.log(decodedToken.userID);
            const user=await User.findById(decodedToken.userID).select('-password');
            if(!user)
            {
                return res.status(401).json(new apiResponse(401, {}, "user not found"));
            }
            req.user=user;
        }
    }
    catch(e)
    {
        if(e.name==="TokenExpiredError")
        {
            try
            {
                console.log("my turn has come")
                const refreshToken=req.cookies.refreshToken;
                const decodedRefreshToken=jwt.verify(refreshToken, 'opensecret');
                const user=await User.findById(decodedRefreshToken.userID).select('-password');
                if(!user)
                {
                    return res.status(401).json(new apiResponse(401, {}, "user not found")); 
                }
                const newAccessToken=await user.generateAccessToken();
                const cookieConfig={
                    httpOnly:true,
                    secure:true
                }
                res.cookie("accessToken", newAccessToken, cookieConfig);
                req.user=user;

            }
            catch(e)
            {
                return res.status(400).json(new apiResponse(400, {}, e.message || "error"));
            }
            
        }
        else
        {
            return res.status(400).json(new apiResponse(400, {}, e.message || "error"));
        }
        
    }
    return next();
}
module.exports={isUserAuthenticated};