const Profile = require("../models/Profile");
const User = require("../models/User");
const { findByIdAndDelete } = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const mongoose = require("mongoose");
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/duration");
const Course = require("../models/Course");

exports.updateProfile = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //fetch data and userID
        const { firstName, lastName, dateOfBirth, about, gender, phoneNumber } = req.body;
        // console.log(firstName, lastName, dateOfBirth, about, gender, phoneNumber)
        const userId = req.user.id;
        //validate data
        if (!userId) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({
                success: false,
                message: "User Id not found"
            })
        }
        if (!firstName && !lastName && !dateOfBirth && !about && !gender && !phoneNumber) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({
                success: false,
                message: "Fill the required fields"
            })
        }
        //findByIdAndUpdate
        const userDetails = await User.findById(userId).populate("additionalDetails").session(session);
        console.log("User details", userDetails);
        const profileId = userDetails.additionalDetails;

        console.log("Profile Id", profileId);

        const updatedUserDetails = await User.findByIdAndUpdate(userId, {
            $set: {
                firstName,
                lastName,
            }
        }, { new: true, session });

        const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`

        await User.findByIdAndUpdate(userId, {
            $set: {
                image: userImage,
            }
        }, { new: true, session });

        //update profile 
        //1

        const updateProfileDetails = await Profile.findByIdAndUpdate(profileId, {
            $set: {
                dateOfBirth: dateOfBirth || userDetails.additionalDetails.dateOfBirth,
                about: about || userDetails.additionalDetails.about,
                gender: gender || userDetails.additionalDetails.gender,
                phoneNumber: phoneNumber || userDetails.additionalDetails.phoneNumber,
            }
        }, { new: true, session });

        console.log("Updated Profile Details", updateProfileDetails);

        // Commit  the transaction
        await session.commitTransaction();
        session.endSession();

        const finalUserDetails = await User.findById(userId).populate("additionalDetails");

        // console.log("Final User Details", finalUserDetails);

        return res.status(200).json({
            success: true,
            message: "Profile Details updated successfully",
            user: finalUserDetails,
        })


    } catch (err) {
        console.log("Error : ", err);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            success: false,
            message: "Profile Details can't be updated",
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        //fetch id
        const userId = req.user.id;
        //validate id
        const userDetails = await User.findById(userId);

        const enrolledCourses = userDetails.courses;

        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "USer not found",
            })
        }
        //delete profile of that user
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);
        //delete user
        const deleteUser = await User.findByIdAndDelete(userId);

        //update studentEnrolled in course
        enrolledCourses.forEach(course => {
            course.studentsEnrolled.forEach(student => {
                if (student === userId) {
                    splice(indexOf(student));
                }
            })
        });
        //return res
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Account cannot be deleted",
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        console.log(displayPicture);
        const userId = req.user.id
        const image = await uploadFileToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        return res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({
                success: true,
                message: "User Id not found"
            })
        }
        const userDetails = await User.findById(userId)
            .populate("additionalDetails")
            .exec();
        console.log("User Details: ", userDetails);
        return res.json({
            success: true,
            message: "User Details Found",
            userDetails,
        })
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id not found"
            });
        }

        let userDetails = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            });

        // Convert the mongoose document to a plain JavaScript object
        let courses = userDetails.courses.map(course => course.toObject());

        for (let i = 0; i < courses.length; i++) {
            let totalDurationInSeconds = 0;
            let SubsectionLength = 0;

            for (let j = 0; j < courses[i].courseContent.length; j++) {
                totalDurationInSeconds += courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                SubsectionLength += courses[i].courseContent[j].subSection.length;
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            });

            let completedVideos = courseProgressCount?.completedVideos.length || 0;

            if (SubsectionLength === 0) {
                courses[i].progressPercentage = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                courses[i].progressPercentage = Math.round((completedVideos / SubsectionLength) * 100 * multiplier) / multiplier;
            }

            // console.log(`courses[${i}].progressPercentage: `, courses[i].progressPercentage);
        }

        // console.log("Final courses: ", courses);

        return res.status(200).json({
            success: true,
            data: courses,
        });

    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            const courseDataWithStacks = {
                _id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStacks
        })
        return res.status(200).json({
            success: true,
            data: courseData,
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
}
