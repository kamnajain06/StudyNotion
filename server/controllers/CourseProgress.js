const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection")

exports.updateCourseProgress = async (req, res) => {

    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    try {
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({ message: "Subsection not found" });
        }
        // check for odd entry
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        });
        
        console.log("courseProgress", courseProgress);
        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course Progress not found"
            })
        }
        // check for re-completed video
        if (courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(400).json({
                success: false,
                message: "Video already completed"
            })
        }
        // add subSectionId to courseProgress
        courseProgress.completedVideos.push(subSectionId);
        courseProgress.save();
        return res.status(200).json({
            success: true,
            message: "Video completed",
            courseProgress
        })

    } catch (err) {
        console.log("Err", err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}