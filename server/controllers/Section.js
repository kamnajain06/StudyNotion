const Section = require("../models/Section")
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;

        //validate data
        if (!sectionName || !courseId) {
            return res.status(403).json({
                success: false,
                message: "Please enter the required fields"
            })
        };

        //create section 
        const newSection = await Section.create({ sectionName: sectionName });

        //add section to the Course Schema
        const section = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id,
            }
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        // console.log("section", section);

        //return user
        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            data: section,
        })
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({
            success: false,
            message: "Unable to create Section"
        })
    }
}

exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionId, courseId } = req.body;
        //valid data
        if (!sectionName || !sectionId) {
            return res.status(403).json({
                success: false,
                message: "Please enter the required fields"
            })
        };
        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {
            sectionName: sectionName,
        }, { new: true });

        const updatedCourse = await Course.findByIdAndUpdate({
            _id: courseId
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })


        //return res
        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            data: updatedCourse,
        });
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({
            success: false,
            message: "Unable to update Section"
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        //fetch id - assuming we are sending id in params
        const { courseId, sectionId } = req.body;
        //findByIdAndDelete and update section
        const deletedSection = await Section.findByIdAndDelete(sectionId);
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: deletedSection._id
            }
        }, { new: true })
            .populate("courseContent")
            .exec();

        //send user
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data: updatedCourse,
        })
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({
            success: false,
            message: "Unable to delete Section"
        })
    }
}