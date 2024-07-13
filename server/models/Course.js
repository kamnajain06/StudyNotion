const mongoose = require("mongoose");

const course = mongoose.Schema({
    language : {
        type: "String",
        enum:["English", "Hindi", "Hinglish"],
        required: true,
        default:"English"
    },
    thumbnail : {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    instructor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true
    },
    tags: {
        type:[String],
        required:true,
    },
    learnings: {
        type:String,
    },
    courseContent : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price : {
        type: String,
        required: true
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    instructions:{
        type:[String],
    },
    status:{
        type:"String",
        enum:["Draft","Published"],
        default:"Draft",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports= mongoose.model ("Course", course);