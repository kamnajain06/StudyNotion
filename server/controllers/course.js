const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { convertSecondsToDuration } = require("../utils/duration")
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();

//createCourse
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { title, description, language, tags, learnings, price, category } = req.body;
        // console.log("Language", language);
        const thumbnail = req.files.thumbnailImage;
        // console.log(thumbnail);
        //validate 
        // if (!title || !description || !language || !learnings || !category || !thumbnail || !tags || !price) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "All fields are required",
        //     })
        // }
        //instructor validation
        const instructorId = await req.user.id;
        const instructorDetails = await User.findById(instructorId);
        // console.log("Instructor Details : ", instructorDetails);

        if (!instructorDetails) {
            return res.status(403).json({
                success: false,
                message: "Instructor Details not found",
            })
        }

        // validity of Category

        const CategoryDetails = await Category.findById(category);
        // console.log("Category Details : ", CategoryDetails);

        if (!CategoryDetails) {
            return res.status(403).json({
                success: false,
                message: "Category Details not found",
            })
        }

        //supported type
        const supportedType = ["jpg", "png", "jpeg"];
        const fileType = thumbnail.name.split(".")[1].toLowerCase();

        if (!supportedType.includes(fileType)) {
            //upload image to cloudinary and save the secure_url
            return res.json({
                success: false,
                message: "File type not supported"
            })
        }
        // console.log("Thumbnail", thumbnail);
        const cloudinaryResponse = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
        // console.log("cloudinary response: ", cloudinaryResponse? cloudinaryResponse : "No response" );

        if (!cloudinaryResponse) {
            return res.json({
                success: false,
                message: "Cloudinary Upload failed"
            })
        }
        const thumbnailUrl = cloudinaryResponse.secure_url;
        // console.log("thumbnail Url : ", thumbnailUrl)

        const course = {
            title: title,
            description: description,
            language: language,
            learnings: learnings,
            thumbnail: thumbnailUrl,
            price: price,
            tags: tags,
            instructor: instructorId,
            category: category,
        }

        //add course to db
        const response = await Course.create(course);
        //  console.log("response: ", response);

        //add the course to the Instructor schema
        await User.findByIdAndUpdate(instructorId, {
            $push: { courses: response._id }
        },
            { new: true });

        // console.log("Catgeory", category);

        //add course entry in Category schema
        await Category.findByIdAndUpdate(category, {
            $push: {
                courses: response._id,
            }
        }, { new: true });

        //return res
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: response,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error while creating the course"
        })
    }
}
//getAllCourses
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            title: true,
            description: true,
            language: true,
            learnings: true,
            price: true,
            Category: true,
            thumbnail: true,
            instructor: true,
            ratingAndReview: true,
            studentsEnrolled: true,
        }).populate("instructor,Category").exec();
        if (!allCourses) {
            return res.status(403).json({
                success: false,
                message: "No courses yet"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Courses found successfully",
            data: allCourses,
        })
    } catch (err) {
        return res.status(500).json({
        })
    }
}
//getFullCourseDetails
exports.getFullCourseDetails = async (req, res) => {
    try {
        //fetch courseId
        const { courseId } = req.body;
        // console.log("CourseId", courseId);

        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate({
                path: "ratingAndReviews",
                populate: [
                    {
                        path: "user",
                    },
                    {
                        path: "course",
                    }
                ]
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()


        if (!courseDetails) {
            console.log("Not found")
            return res.status(403).json({
                success: false,
                message: `Couldn't find the course details for the ${courseId}`,
            })
        }
        // console.log("Course Details", courseDetails);

        let totalDurationInSeconds = 0
        courseDetails?.courseContent?.forEach((content) => {
            console.log("Content", content);
            content?.subSection?.forEach((subSection) => {
                // console.log("Subsection", subSection)
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                // console.log("Time Duration", timeDurationInSeconds);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })
        // console.log("Total Duration", totalDurationInSeconds);

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds) || 0;
        // console.log("Total Duration", totalDuration)

        //return response
        return res.status(200).json({
            success: true,
            courseDetails,
            totalDuration
        })
    } catch (err) {
        console.log("Error", err);
        return res.status(403).json({
            success: false,
            message: "Couldn't fetch Course",
        })
    }
}
exports.getViewCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
            // console.log("Course id", courseId);
            // console.log("user id", userId);

        const courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        }).exec();

        // console.log("courseProgressCount : ", courseProgressCount)

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
// Edit Course
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadFileToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tags" || key === "instructions") {
                    try {
                        course[key] = JSON.parse(updates[key]);
                    } catch (err) {
                        console.error(`Error parsing ${key}:`, err);
                        return res.status(400).json({ error: `Invalid format for ${key}` });
                    }
                } else {
                    course[key] = updates[key];
                }
                console.log(`Updated course[${key}]:`, course[key]);
            }
        }

        const result = await course.save();
        console.log("Result", result);

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        console.log("Updated Course", updatedCourse);

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .populate("instructor")
            .sort({ createdAt: -1 })
            .exec()

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        console.log("CourseId", req.body);

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        const updatedCourses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data: updatedCourses
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}
exports.getOtherInstructorCourses = async (req, res) => {
    try {
        const { courseId } = req.body;
        // console.log("CourseId", courseId);
        const courseDetails = await Course.findById(courseId);
        // console.log("Course Details", courseDetails);
        const instructorId = courseDetails.instructor;
        const instructorCourses = await Course.find({ instructor: instructorId })
            .populate("instructor").exec();
        // console.log("Instructor Courses", instructorCourses);
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: instructorCourses
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}