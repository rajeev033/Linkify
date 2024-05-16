const Url = require("../models/url.model");
const crypto = require("crypto");
const Analytics = require("../models/analytics.model");
const {apiResponse} = require("../utils/apiResponse");
function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(7, (err, buff) => {
      if (err) {
        reject(err);
      } else {
        resolve(buff.toString("hex"));
      }
    });
  });
}




async function generateShortID(originalURL) {
  const timestamp = Date.now();
  const salt = await generateSalt();
  const hexString = crypto
    .createHash("sha256")
    .update(originalURL + salt + timestamp)
    .digest("hex")
    .slice(0, 10);
  return hextoBase62(hexString);
}



function hextoBase62(hexString) {
  let decimalValue = parseInt(hexString, 16);
  const Base62 =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let base62String = "";
  while (decimalValue != 0) {
    base62String = Base62[decimalValue % 62] + base62String;
    decimalValue = Math.floor(decimalValue / 62);
  }
  return base62String;
}




async function shortenURL(req, res) 
{
  console.log("i am in shortenURL")
  try
  {
    const { originalURL} = req.body;
    console.log(originalURL);
    let shortID=null
    let isIdExists = true;
    
    while (isIdExists) 
    {
      shortID = await generateShortID(originalURL);
      isIdExists = await Url.findOne({ shortID });
    }
    
    
    const url = new Url({ shortID, originalURL, userID: req.user?req.user._id:null});
    
    console.log("short id created successfully");
    await url.save();
    if(req.user)
    {
      try
      {
        const urlAnalytics = new Analytics({ urlID: url._id });
        await urlAnalytics.save();
        console.log("url analytics created successfully");
      }
      catch(e)
      {
        console.log(e);
      }
      
    }
  
    return res.status(200).json(new apiResponse(200, { shortID: shortID }, "URL shortened successfully"));

  }
  catch(e)
  {
    return res.status(500).json(new apiResponse(500, {}, e.message ||"error"));
  }
  
}




async function redirectToOriginal(req, res) 
{
  const { shortID } = req.params;
  console.dir(req.path);
  console.log(req.params); 
  try {
    const url = await Url.findOne({ shortID });
    console.log(url.originalURL);
    if(url) 
    {
      const urlAnalytics = await Analytics.findOne({ urlID: url._id });
      if (urlAnalytics) 
      {
        const user_agents = req.headers["user-agent"];
        urlAnalytics.setAnalytics(user_agents);
        await urlAnalytics.save();
      }
      
    }
    res.status(301).redirect(url.originalURL);
  }
  catch (e) 
  {
    res.status(500).json(new apiResponse(500, {}, e.message || "error"));
  }
  
}


async function getUrls(req,res){
  try{
    const urls= await Url.find({userID:req.user._id});
    res.status(200).json(new apiResponse(200, {urls:urls}, "urls fetched successfully"));
  }
  catch(e)
  {
    res.status(500).json(new apiResponse(500, {}, e.message || "error"));
  
  }
}

async function deleteUrls(req, res)
{
  try
  {
    const {shortID}=req.query;
    await Url.findOneAndDelete({shortID});
    console.log("url deleted successfully");
    res.status(200).json(new apiResponse(200, {}, "url deleted successfully"));
  }
  catch(e)
  {
    res.status(500).json(new apiResponse(500, {}, e.message || "error"));
  
  }
}
module.exports = { shortenURL, redirectToOriginal, getUrls, deleteUrls };
