const express = require("express")
const router = express.Router()

const {
    createCourse,
    getAllCourses,
    getFullCourseDetails,
    editCourse,
    deleteCourse,
    getInstructorCourses,
    getOtherInstructorCourses,
    getViewCourseDetails
  } = require("../controllers/course")
  
const {
    getAllCategory,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category")

const {
    createSection,
    updateSection,
    deleteSection,
  } = require("../controllers/Section")

  const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
  } = require("../controllers/SubSection")

  const {
    createRating,
    getAverageRating,
    getAllRatingAndReviews,
    ratingNreviewsCourse,
  } = require("../controllers/ratingAndReviews")

  const {
    updateCourseProgress
  } = require("../controllers/CourseProgress")

  const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

  // Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses)
router.post('/getOtherInstructorCourses', getOtherInstructorCourses)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", getFullCourseDetails)
router.post("/getViewCourseDetails", auth, isStudent, getViewCourseDetails)

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth, isStudent, createRating)
router.post("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReviews)
router.get("/rating/:courseId", ratingNreviewsCourse)

router.post("/updateCourseProgress", auth, isStudent,updateCourseProgress);

module.exports = router;

