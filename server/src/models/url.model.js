const mongoose=require('mongoose');
const User= require('./user.model')
const urlSchema= new mongoose.Schema({
    shortID: {
          type:String,
          required:true,
          unique:true
    }, 
    originalURL:{
      type: String,
      required: true
    },
    
    userID : {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null
          },
    date: {
      type: Date,
      default: Date.now
    }
    
});
const Urls= mongoose.model("Url", urlSchema);

module.exports= Urls;

