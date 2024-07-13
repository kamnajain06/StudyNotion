const { instance } = require("../config/razorpay");
const mongoose = require("mongoose");
const crypto = require("crypto")
const { ObjectId } = require('bson');
const Course = require("../models/Course");
const user = require("../models/User");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const CourseProgress = require("../models/CourseProgress");

// For single payment
//capture payment 

// exports.capturePayment = async (req, res) => {
//     //fetch courseId and UserId
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validate courseId
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"Please add valid CourseId",
//         })
//     }
//     //validate CourseDetails
//     const courseDetails = await course.find({course_id});
//     if(!courseDetails){
//         return res.json({
//             success:false,
//             message:"Course Details not found",
//         })
//     }
//     //validate userEnrolled
//     const uId = await Mongoose.Types.ObjectID(userId);
//     if(!courseDetails.studentEnrolled.uId){
//         return res.json({
//             success:false,
//             message:"User not enrolled",
//         })
//     }
//     //create a RazorPay order
//     const options = {
//         amount: amount*100,
//         currency: "INR",
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     }
//     try{
//         const paymentResponse = await instance.create(options);
//         //return response
//         console.log(paymentResponse);
//         return res.status(200).json({
//             success:true,
//             courseName: courseDetails.courseName,
//             courseDescription: courseDetails.courseDescription,
//             thumbnail: courseDetails.thumbnail,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//             orderId : paymentResponse.orderId,
//         })
//     }catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"Could not intiate order"
//         })
//     }
// }

// exports.verifySignature = async (req,res)=> {
//     const webhookSecret = "123456";
//     const signature = req.headers["x-razorpay-ignatue"];
//     const shasum = crypto.createHMAC("sha256", webhookSecret);
//     shasum.update(JSON.stringify());
//     const digest = shasum.digest("hex");

//     if(digest === signature){
//         const {courseId,userId} = req.body.payload.payment.entity.notes;

//         //find user and update course in it

//         const enrolledStudent = await user.findOneAndUpdate(
//             {_id : userId},
//             {
//                 $push: {courses: courseId}
//             },
//             {new:true})

//         if(!enrolledStudent){
//             return res.json({
//                 success:false,
//                 message:"User not found",
//             })
//         }

//         //find course and update user in it

//         const enrolledCourse = await course.findOneAndUpdate(
//             {_id: courseId},
//             {$push : {studentEnrolled: userId}},
//             {new: true},
//         )

//         if(!enrolledCourse){
//             return res.json({
//                 success:false,
//                 message:"Course not found",
//             })
//         }

//         const mailResponse = await mailSender(enrolledStudent.email, "Congratulations from Codehelp", `You have successfully enrolled in ${enrolledCourse.courseName}!`)
//         console.log(mailResponse);

//         return res.status(200).json({
//             success:true,
//             message:"Enrolled in course successfully",
//         })

//     }else{
//         return res.status(500).json({
//             success:false,
//             message:"Could not enrolled in course"
//         })
//     }

// }

// For multiple payments
// initiate the razorpay object
exports.capturePayment = async (req, res) => {

    const { courses } = req.body;
    console.log("Courses", courses)
    const userId = req.user.id;

    if (courses?.length === 0) {
        return res.status(500).json({
            success: false,
            message: "No courses selected"
        })
    }
    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            console.log("course_id", course_id);
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            console.log('UId', uid)
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(500).json({
                    success: false,
                    message: "You have already enrolled in this course"
                })
            }
            totalAmount += parseInt(course.price);
        } catch (error) {
            console.log("Error", error);
            return res.status(500).json({
                success: false,
                message: "Error in fetching course"
            })
        }
    }
    console.log("Total Amount", totalAmount);

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
        notes: {
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone
        }
    }
    try {
        const paymentResponse = await instance.orders.create(options);
        return res.json({
            success: true,
            message: "Payment link generated",
            paymentResponse
        })
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({
            success: false,
            message: "Error in creating payment"
        })
    }
}
// verify payment
exports.verifySignature = async (req, res) => {
    const razorpayOrderId = req.body.razorpay_order_id;
    const razorpayPaymentId = req.body.razorpay_payment_id;
    const razorpaySignature = req.body.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }
    let body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpaySignature) {
        // enroll student
        await enrollStudents(courses, userId, res);

        return res.status(200).json({
            success: true,
            message: "Payment verified"
        })
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed"
        })
    }

}

exports.sendPaymentSuccessEmail = async (req, res) => {

    const { orderId, paymentId, amount } = req.body;

    // console.log("OrderId", orderId);
    // console.log("PaymentId", paymentId);
    // console.log("Amount", amount);


    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json(
            { 
                success: false, 
                message: "Please provide all the details" 
            })
    }

    try {
        const enrolledStudent = await user.findById(userId)

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}

const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }

    for (const course_id of courses) {
        try {
            // add user to the course
            console.log("CourseId", course_id);
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: course_id },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )
            // console.log("EnrolledCourse", enrolledCourse)
            if (!enrolledCourse) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to enroll student"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId : course_id,
                userId : userId,
                completedLectures : [],
            })
            console.log("CourseProgress", courseProgress)
            // add course to the user schema
            const enrolledStudent = await user.findOneAndUpdate(
                { _id: userId },
                { $push: { 
                    courses: course_id,
                    courseProgress: courseProgress._id,
                } },
                { new: true }
            )

            // Send mail to the user
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully enrolled to ${enrolledCourse.title}`,
                courseEnrollmentEmail(enrolledCourse.title, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            );
            // console.log("emailResponse", emailResponse);
            if (!emailResponse) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to send email"
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
}