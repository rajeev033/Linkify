const Analytics=require('../models/analytics.model');
const {apiResponse}=require('../utils/apiResponse');
const Url=require('../models/url.model');
async function getAnalytics(req, res)
{
    try
    {
        const {shortID}=req.query;
        console.log(shortID);
        const url=await Url.findOne({shortID});
        if(url)
        {   
            const analytics=await Analytics.findOne({urlID:url._id});
            res.status(200).json(new apiResponse(200,{analytics:analytics},"analytics fetched successfully"));
        }
        else 
        {
            res.status(404).json(new apiResponse(404,{},"url not found"));
        }
        
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json(new apiResponse(500,{},"error fetching analytics"));
    }
}
module.exports={getAnalytics};