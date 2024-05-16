const mongoose=require('mongoose');

const connectDB =async()=>{
try{
    await mongoose.connect("mongodb://127.0.0.1:27017/MyDB");
    console.log("connected to the mongoose server");
}
catch
{
    console.log("connection error");
}}
module.exports= connectDB;
