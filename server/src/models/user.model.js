const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        
        firstName:{
            type:String,
            required:true,
        },
        lastName:
        {
            type:String,
            default:"",
        },
        userName: { 
            type: String,
            required:true,
            lowercase:true, 
            unique:true,
        },
        email: {
            type:String,
            required:true,
            unique:true
        },
        password: {
            type:String,
            required:true,
        } ,
});
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken=function()
{
    const payload={
        userName:this.userName,
        email:this.email,
        userID:this._id
    }
   
    const options={
        expiresIn: '1h'
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'opensecret', options);
}
userSchema.methods.generateRefreshToken=function(){
    const payload={
        userID:this._id,
    }
    const options={
        expiresIn:'1d'
    }
    return jwt.sign(payload, 'opensecret', options);
    
}

const User = mongoose.model("User", userSchema);

module.exports = User;
