const User = require("../models/User");
const mailSender = require('../utils/mailSender');
const bcrypt = require("bcrypt")
const crypto = require('crypto')

//resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
    try{
        //get email
        const {email} = req.body;
        console.log("email", email)
        //validate email
        if(!email){
            return res.json({
                success:false,
                message:"Please enter the Email Id"
            })
        }
        const user = await User.findOne({email});
        console.log("User ", user);
        if(!user){
            return res.json({
                success:false,
                message:"Email is not registered",
            })
        };
        //generate token
        const token = crypto.randomBytes(12).toString('hex'); //generates random number
        console.log("token: ", token);
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {email: email}, 
            {$set : 
                {token : token,
                resetPasswordExpires: Date.now() + 5*60*1000}},
            {new:true})
        console.log("Updated Details of User with token : ", updatedDetails);
        //create url and send mail containg url
        const url = `http://localhost:3000/reset-password/${token}`
        const mail = await mailSender(email,'Reset Pasword',`Click on the link to reset Password : ${url}`);
        //return user
        return res.status(200).json({
            success:true,
            message:"Email sent successfully"
        })
    }catch(err){
        console.log("Error while sending email : ",err);
        return res.status(500).json({
            success:false,
            message:"Error while sending email"
        })
    }
}

//resetPassword -> updates password in db

exports.resetPassword = async(req,res) => {
    try{
        //data fetch
        const {token, password, confirmPassword} = req.body;
        //validate data
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Passwords do not match",
            })
        }
        //get userdetails using token
        const userDetails = await User.findOne({token:token});
        //token validation
        //1 => token not found
        if(!userDetails){
            return res.json({
                success:false,
                message:"User not found"
            })
        }
        //2 => token expired
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token expired"
            })
        }
        //hash password
        const hashPass = await bcrypt.hash(password,10);
        //update in db
        await User.findOneAndUpdate({token:token},{$set : {
            password:hashPass
        }}, 
        {new:true});
        //return user
        return res.status(200).json({
            success:true,
            message:"Password reset Successful"
        })
    }catch(err){
        console.log("Error while updating password in db: ", err);
        return res.status(500).json({
            success:false,
            message:"Error while updating password in db"
        })
    }
}