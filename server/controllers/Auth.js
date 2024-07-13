const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
const validator = require("email-validator");
const Profile = require("../models/Profile");
//sendotp

exports.sendOTP = async (req,res) => {
    console.log("start");
    try{
        console.log(0)
        const {email} = req.body;
        const checkUser = await User.findOne({email});
        console.log(1);
        //If User exists
        if(checkUser){
            //status code for already exists -> 403
            return res.status(403).json({
                success:false,
                message:'User already registered',
            })
        }
        console.log(2);
        //If User doesn't exist
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("Generated OTP : ", otp);
        const result = await OTP.findOne({otpValue : otp});
        console.log(3);
        while(result){
             otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result = await OTP.findOne({otpValue : otp});
        }
        console.log(4);
        console.log(otp);
        //save otp in db

        const otpPayload = { email, otpValue:otp};

        const user = await OTP.create(otpPayload);

        console.log("user of OTP saved in DB : ", user);

        return res.status(200).json({
            success: true,
            message:"OTP Generated Successfully",
            otp
        })

    }catch(err){
        console.log("Error while generating otp: ", err);
        return res.status(500).json({
            sucess:false,
        })
    }

}

//     try {
//       const { email } = req.body
  
//       // Check if user is already present
//       // Find user with provided email
//       const checkUserPresent = await User.findOne({ email })
//       // to be used in case of signup
  
//       // If user found with provided email
//       if (checkUserPresent) {
//         // Return 401 Unauthorized status code with error message
//         return res.status(401).json({
//           success: false,
//           message: `User is Already Registered`,
//         })
//       }
  
//       var otp = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//       })
//       const result = await OTP.findOne({ otp: otp })
//       console.log("Result is Generate OTP Func")
//       console.log("OTP", otp)
//       console.log("Result", result)
//       while (result) {
//         otp = otpGenerator.generate(6, {
//           upperCaseAlphabets: false,
//         })
//       }
//       const otpPayload = { email, otp }
//       const otpBody = await OTP.create(otpPayload)
//       console.log("OTP Body", otpBody)
//       res.status(200).json({
//         success: true,
//         message: `OTP Sent Successfully`,
//         otp,
//       })
//     } catch (error) {
//       console.log(error.message)
//       return res.status(500).json({ success: false, error: error.message })
//     }
// }
  
//signup

exports.signup = async(req,res) => {
    try{    
        //fetch data
        const {
            firstName,
            lastName,
            email,
            accountType,
            password,
            confirmPassword,
            otp
        } = req.body;

        //validate data

        if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp){
            return res.status(500).json({
                success:false,
                message: "Fields incomplete"
            })
        }

        //validate email

        //existing user

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(403).json({
                success:false,
                message: "User already registered"
            })
        }

        //match passwords

        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Passwords do not match"
            })
        }
        //match otp

        const response = await OTP.find({ email }).sort({ timeStamp: -1 }).limit(1)
            console.log("Response OTP: ",response);
            console.log("OTP : " ,otp);
            if (response.length === 0) {
                // OTP not found for the email
                return res.status(400).json({
                    success: false,
                    message: "No OTP",
            })
            } else if (otp !== response[0].otpValue) {
                // Invalid OTP
                return res.status(400).json({
                    success: false,
                    message: "The OTP is not valid",
            })
            }
        console.log("Profile section : ");
        //Profile
        const profile = await Profile.create({
            gender:null,
            dateOfBirth:"",
            about:"",
            phoneNumber:""
        })
        console.log("Profile", profile);
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        // console.log("Hashed Password :",hashedPassword)
        //create entry
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        //return res
        console.log("User : ", user)

        return res.status(200).json({
            success:true,
            message:"User created Successfully",
            user
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User not created",
        })
    }
}

//login
exports.login = async (req,res) => {
    try{
        //fetch data
        const {email, password} = req.body;
        //validate data
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"Fill the required fields"
            })
        }
        //check existing user
        const user = await User.findOne({email}).populate("additionalDetails").exec();
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User not registered"
            })
        }
        //match passwords
        const checkPassword = await bcrypt.compare(password,user.password);

        const payload = {
            email: user.email,
            id : user._id,
            role: user.accountType,
        }
        if(checkPassword){
            const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: '24h',
            })
            user.token= token;
            user.password = undefined;

            //create cookie and send user
            const options = {
                expires: new Date (Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie('token', token,options).status(200).json({
                success:true,
                user,
                message:"Log in Successful"
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"Passwords do not match"
            })
        }
        
    }catch(err){
        console.log("Error : ", err);
        return res.status(500).json({
            success:false,
            message:"Unable to Login"
        })
    }
}
//changePassword

exports.changePassword = async (req,res) => {
    try{
        //fetch data from req body

        const userId = await req.user.id;
        const userDetails = await User.findById(userId);

        const email = userDetails.email;

        const {oldPassword, newPassword, confirmPassword} = req.body;

        //validate data
        if(!email || !oldPassword || !newPassword || !confirmPassword){
            return res.json({
                success:false,
                message:"InComplete Fields"
            })
        }
        console.log("User Details ->>>", userDetails);
        if(!await bcrypt.compare(oldPassword,userDetails.password)){
            return res.json({
                success:false,
                message:"Invalid User"
            })
        }
        if(newPassword !== confirmPassword){
            return res.json({
                success:false,
                message:"Passwords do not match"
            })
        }
        const newHashPass = await bcrypt.hash(newPassword,10);
        const updatedData = await User.findOneAndUpdate(
            {email:email},
            {$set: {password:newHashPass}},
            {new:true}
        );
        console.log("Updated Data: ", updatedData);

        return res.status(200).json({
            success:true,
            message:"Password changed Successfully",
            updatedData
        });

    }catch(err){
        console.log("Error: ",err);
        return res.status(500).json({
            success:false,
            message:"Error while changing password",
        })
    }
}