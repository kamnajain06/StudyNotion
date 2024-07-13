const ratingAndReview = require("../models/RatingAndReview");
const course = require("../models/Course");
const user = require("../models/User");
const RatingAndReview = require("../models/RatingAndReview");
const { Mongoose } = require("mongoose");

//createRating
exports.createRating = async(req,res) => {
    try{
        //get user id
        const userId = req.user.id;
        //fetch data from request's body
        const {rating,review,courseId} = req.body;
        //check if user is enrolled or not

        if(!rating || !review || !courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill all the fields"
                });
        }

        console.log("data",rating,review,courseId )

        //M-1
        // const courseDetails = await course.findById(courseId);
        // if(!courseDetails.studentEnrolled.userId){
        //     return res.json({
        //         success:false,
        //         message:"Course not found"
        //     })
        // }

        //M-2
        const courseDetails = await course.findOne(
            {_id : courseId},
            {studentsEnrolled: {$elemMatch: {$eq : userId}}}
        );
        console.log("Course Details", courseDetails);
        if(!courseDetails){
            return res.json({
                success:false,
                message:"Course not found"
            })
        }

        // //check if user already reviewed 

        // M-1
        // if(!courseDetails.ratingAndReviews.userId)

        // M-2
        const userReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })
        console.log("userReviewed", userReviewed)
        if(userReviewed){
            return res.json({
                success:false,
                message:"Already Reviewed"
            })
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            user:userId,
            rating,
            review,
            course:courseId,
        });
        console.log("RatingAndReview", ratingReview)
        //update course
        const updatedCourse = await course.findByIdAndUpdate(
            {_id: courseId},
            {$push : {
                ratingAndReviews:ratingReview._id
            }},
            {new:true},
        )
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating And Review Successful",
            updatedCourse,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
//averageRating
exports.getAverageRating = async (req,res) => {
    try{
        //get courseId
        const {courseId} = req.body;

        console.log("CourseId", courseId);

        //calculate average rating

        const result = await RatingAndReview.aggregate(
            [
                {
                    $match : {
                        course : new Mongoose.Types.ObjectId(courseId),
                    }
                },
                {
                    $group: {
                        _id:null,
                        averageRating : {$avg: "$rating"}
                    }
                }
            ]
        )

        //return rating
        if(result.length> 0 ){
            return res.status(200).json({
                success:true,
                averageRating : result[0].averageRating,
            })
        }
        return res.json({
            success:false,
            averageRating:0,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
//getAllRating
exports.getAllRatingAndReviews = async(req,res) => {
    const ratingNreviews = await RatingAndReview.find({})
                                .sort({rating : "desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image"
                                })
                                .populate({
                                    path:"course",
                                    select:"title"
                                })
                                .exec();
    return res.status(200).json({
        success:true,
        message:"All reviews fetched successfully",
        ratingNreviews,
    })
}
//get rating and reviews for a particular response
exports.ratingNreviewsCourse = async (req,res) => {
    try{
        const {courseId} = req.body;
        
        const ratingNreview = await RatingAndReview.find({course: courseId})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName image"
                                    })
                                    .populare({
                                        path:"course",
                                        select:"courseName"
                                    })
                                    .exec();

        if(!ratingNreview){
            return res.status(403).json({
                success:false,
                message:"Cannot find Rating And Review for that particular Course",
            })
        }

        return res.json({
            success:true,
            ratingNreview,
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


