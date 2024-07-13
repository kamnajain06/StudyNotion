const mongoose = require("mongoose");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
const mailSender = require("../utils/mailSender");

const otpSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    otpValue : {
        type: String,
        required: true
    },
    timeStamp : {
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
})

//function that will be sending the mails

async function sendVerificationEmail(email, otp){
    try{
        let sendMail = await mailSender(email,'Verification Mail by StudyMate || Kamna', otpTemplate(otp));
        console.log("Email user : ", sendMail);

    }catch(err){
        console.log("Error while sending Mail : ", err);
    }
} 

//pre middleware

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otpValue);
    next();
})

module.exports= mongoose.model ("OTP", otpSchema);