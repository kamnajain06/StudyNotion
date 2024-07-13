const BASE_URL = process.env.REACT_APP_BASE_URL

export const endPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword"
}

export const contactUs = {
    CONTACT_US_API: BASE_URL + "/contact"
}

export const studentEndPoints = {
    COURSE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API : BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL : BASE_URL + "/payment/sendPaymentSuccessEmail"

}

export const profile = {
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    GET_PROFILE_API: BASE_URL + "/profile/getUserDetails",
    UPDATE_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
    DELETE_PROFILE: BASE_URL + "/profile/deleteProfile",
    GET_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA: BASE_URL + "/profile/getInstructorDash"
}

export const categories = {
    CATEGORIES_API: BASE_URL + '/course/showAllCategories',
}

export const courseEndpoints = {
    GET_ALL_COURSES_API: BASE_URL + '/courses/getAllCourses',
    COURSE_DETAILS_API: BASE_URL + '/course/getFullCourseDetails',
    GET_VIEW_COURSE_DETAILS: BASE_URL + '/course/getViewCourseDetails',
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    GET_OTHER_INSTRUCTOR_COURSES: BASE_URL + "/course/getOtherInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    LECTURE_COMPLETION_API : BASE_URL + "/course/updateCourseProgress"
}

export const categoryPageEndpoints = {
    GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const ratingNreviewEndpoints = {
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    GET_AVERAGE_RATING: BASE_URL + '/course/getAverageRating',
    GET_ALL_REVIEWS_API: BASE_URL + '/course/getReviews',
    GET_RATINGS_FOR_A_COURSE: BASE_URL +'/course/rating/course:id'
}