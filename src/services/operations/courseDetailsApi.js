import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { categories, courseEndpoints } from "../apis";

const {
    GET_ALL_COURSES_API,
    COURSE_DETAILS_API,
    GET_VIEW_COURSE_DETAILS,
    CREATE_COURSE_API,
    GET_INSTRUCTOR_COURSES_API,
    GET_OTHER_INSTRUCTOR_COURSES,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    EDIT_COURSE_API,
    DELETE_COURSE_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    LECTURE_COMPLETION_API
} = courseEndpoints

const {
    CATEGORIES_API
} = categories

export const getAllCourses = (setCourse) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("GET", GET_ALL_COURSES_API);
            if (!response.data.success) {
                throw new Error(response.data.message)

            }
            console.log("GET ALL COURSES API response", response.data);
            toast.success("Fetched All courses successfully");
            dispatch(setCourse(response.data));
            toast.dismiss(toastId);
        } catch (err) {
            toast.error("Failed to fetch all courses");
            toast.dismiss(toastId);
        }
    }
}
export const fetchInstructorCourses = async (token) => {
    let result = []
    // const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("INSTRUCTOR COURSES API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        toast.success("Fetched Courses successfully");
        result = response?.data?.data
        console.log("Result", result);
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId)
    return result
}
export const fetchOtherInstructorCourses = async (courseId) => {
    let result = [];
    // const toastId = toast.loading("Loading...");
    // console.log("course Id", courseId)
    try {
        const response = await apiConnector(
            "POST",
            GET_OTHER_INSTRUCTOR_COURSES,
            { courseId }
        )
        console.log("OTHER INSTRUCTOR COURSES API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        // toast.success("Fetched Courses successfully");
        result = response?.data?.data
        // console.log("Result", result);
    } catch (error) {
        console.log("OTHER INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId);
    return result;
}
export const fetchCourseDetails = async (courseId) => {
    // const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        })
        console.log("COURSE_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    // toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
export const fetchViewCourseDetails = async (courseId, token) => {
    console.log("Course Id", courseId)
    // const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("POST", GET_VIEW_COURSE_DETAILS, { courseId }, {
            Authorization: `Bearer ${token}`
        })
        console.log("VIEW_COURSE_DETAILS_API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data;
    }
    catch (error) {
        console.log("VIEW_COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    // toast.dismiss(toastId)
    return result;

}
export const fetchCourseCategories = async () => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("GET", CATEGORIES_API)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            console.log("COURSE CATEGORIES API response", response.data.allCategory);
            toast.success("Fetched course categories successfully");
            toast.dismiss(toastId);
            return response.data.allCategory;
        } catch (err) {
            toast.error("Failed to fetch course categories");
            toast.dismiss(toastId);
            return [];
        }
    }
}
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...");
    // console.log("Language", data);
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section")
        }
        toast.success("Course Section Created")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    console.log("Result of courseDetailsApi", result);
    return result
}
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SUB-SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data?.data
        console.log("Result", result);
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SUB-SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SUB-SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture")
        }
        toast.success("Lecture Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const deleteCourse = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course")
        }
        toast.success("Course Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}
export const markLectureAsCompleted = async (data, token) => {
    let result = []
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log(
            "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
            response
        )
        
        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed")
        result = response?.data?.courseProgress
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}
