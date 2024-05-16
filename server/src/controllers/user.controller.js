const User = require('../models/user.model');
const {apiResponse}=require('../utils/apiResponse');
const bcrypt=require('bcrypt');
async function loginUser(req, res){
    const {email, password}=req.body;
    try
    {

       /* if(!userName && !email)
        {
            return res.status(401).json(new apiResponse(401,{},"invalid Username or Email"));``
        }
        const idf=email || user*/
        const user= await User.findOne({email:email});
        console.log(user);
        console.log("user found");
        if(!user)
        {
           return res.status(401).json(new apiResponse(401, {}, "invalid email or password"));
        }
        const isPasswordCorrect= await user.isPasswordCorrect(password);
        console.log("password checked");
        console.log(isPasswordCorrect);
        if(!isPasswordCorrect)
        {
            console.log("password incorrect");
            return res.status(401).json(new apiResponse(401, {},"invalid email or password"));
            
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        const cookieConfig={
            httpOnly:true,
            secure:true
        }
        const resData={
            
                _id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                userName:user.userName,
                email:user.email
            
        }
        res.status(200)
        .cookie('accessToken', accessToken, cookieConfig)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json(new apiResponse(200,{user:resData}, 'logged in succesfully' ));
    }
    catch(e)
    {
        console.log("in catch block");
        return res.status(500).json(new apiResponse(500, {}, "error logging in"));
    }
  
    

}


async function registerUser(req, res)
{
    const {firstName, lastName="", userName, email, password}=req.body;
    if(!userName || !email || !password || !firstName)
    {
        return res.status(400).json(new apiResponse((400, {},"username, email or password not provided")));
    } 
    const userExists= await User.findOne({$or:[{userName:userName}, {email:email}]});
    if(userExists)
    {
        return res.status(400).json(new apiResponse(400, {}, "user already exists"));
    }
    try{
        const hashedPassword= await bcrypt.hash(password, 12);
        const user= new User({firstName, lastName,userName, email, password:hashedPassword});
        await user.save();
        const resData={
            
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            userName:user.userName,
            email:user.email
        
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        const cookieConfig={
            httpOnly:true,
            secure:true
        }
        
        res.status(200)
        .cookie('accessToken', accessToken, cookieConfig)
        .cookie('refreshToken', refreshToken, cookieConfig)
        .json(new apiResponse(200,{user:resData}, 'User Registered succesfully'));

    }
    catch(e)
    {
        res.status(500).json(new apiResponse(500, {}, "error registering user"));
    }
    

}
async function logoutUser(req, res)
{
    res.clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json(new apiResponse(200, {}, "logged out successfully"));
}
async function updateEmail(req, res)
{
    const {newEmail}=req.body;
    if(!email)
    {
        return res.status(400).json(new apiResponse(400, {}, "email not provided"));
    }
    try
    {
        const user= await User.findById(req.user._id);
        user.email=newEmail;
        await user.save();
        res.status(200).json(new apiResponse(200, {}, "email updated successfully"));
    }
    catch(e)
    {
        res.status(500).json(new apiResponse(500, {}, "error updating email"));
    }
}

async function updateUserName(req, res)
{
    const {newUserName}=req.body;
    if(!newUserName)
    {
        return res.status(400).json(new apiResponse(400, {}, "username not provided"));
    }
    try
    {
        let user= await User.findOne({userName:newUserName});
        if(user)
        {
            res.status(400).json(new apiResponse(400, {}, "username already exists"));
        }
        else
        {
            let user=await User.findById(req.user._id);
            user.userName=newUserName;
            await user.save();
        }
    }
    catch(e)
    {
        res.status(500).json(new apiResponse(500, {}, "error updating username"));
    
    }
}
async function updatePassword(req, res)
{
    const {newPassword, oldPassword}=req.body;
    if(!newPassword)
    {
        return res.status(400).json(new apiResponse(400, {}, "password not provided"));
    }
    try
    {
        let user= await User.findById(req.user._id);
        const isPasswordCorrect= await user.isPasswordCorrect(oldPassword);
        if(isPasswordCorrect)
        {
            const hashedPassword= await bcrypt.hash(newPassword, 12);
            user.password=hashedPassword;
            await user.save();
            res.status(200).json(new apiResponse(200, {}, "password updated successfully"));
        }
        else
        {
            res.status(400).json(new apiResponse(400, {}, "incorrect password"));
        }
       
    }
    catch(e)
    {
        res.status(500).json(new apiResponse(500, {}, "error updating password"));
    }

}
module.exports={loginUser, registerUser, logoutUser, updateEmail, updateUserName, updatePassword};