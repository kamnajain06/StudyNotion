const contactSchema = require("../models/Contact");
const mailSender = require("../utils/mailSender");

exports.contactUs = async(req,res) => {
    try{
        const {firstName, lastName, email, phoneNo, message} = req.body;

        if(!firstName, !lastName, !email, !phoneNo, !message){
            return res.json({
                success:false,
                message:"Please enter the required fields",
            })
        }

        const payload = {
            firstName,
            lastName,
            email,
            phoneNo,
            message,
        }

        const mailSendToUser = await mailSender(email,"Confirmation Email", "Your response has been submitted to EdTech. We'll contact you shortly");
        console.log(mailSendToUser);
        const mailSendToEdTech = await mailSender(process.env.MAIL_USER,"Response from a User",payload);
        console.log(mailSendToEdTech);

        return res.status(200).json({
            success:true,
            message:"Mail Sent Successfully",
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while sending email"
        })
    }
}