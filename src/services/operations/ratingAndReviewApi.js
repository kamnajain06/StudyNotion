
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { ratingNreviewEndpoints } from "../apis";

import { CREATE_RATING_API } from "../apis"

export const getAverageRating = async (data) => {
    const toastId = toast.loading("Loading...");

    // console.log("hf", courseId);
    try {
        const response = await apiConnector("POST", ratingNreviewEndpoints.GET_AVERAGE_RATING, {
            courseId: data,
        });

        console.log("courseId", { courseId: data, })
        if (!response) {
            throw new Error("Error while fetching Average Rating");
        }
        console.log("Average Rating fetched successfully", response);
        toast.success("Average Rating fetched successfully");
        return response;
    } catch (error) {
        toast.error("Error while fetching Average Rating");
        console.log("Error while fetching Average Rating", error);
    }
    toast.dismiss(toastId);
    return;
}
export const createRating = async (data, token) => {
    let result = [];
    console.log("Data", data);
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", ratingNreviewEndpoints.CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Response", response);
        if (!response?.data?.success) {
            toast.error(response?.data?.message);
            toast.dismiss(toastId);
            return;
        }
        console.log("CREATE RATING API RESPONSE............", response)
        toast.success("Rating Created")
        result = response?.data?.ratingReview
    } catch (error) {
        console.log("CREATE RATING API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}
export const getAllRatingAndReviews = async () => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", ratingNreviewEndpoints.GET_ALL_REVIEWS_API);
        console.log("Response", response);
        if (!response) {
            throw new Error("Error while fetching Rating and Reviews");
        }
        console.log("Rating and Reviews fetched successfully", response);
        // toast.success("Rating and Reviews fetched successfully");
        toast.dismiss(toastId);
        return response;
    } catch (error) {
        toast.error("Error while fetching Rating and Reviews");
        console.log("Error while fetching Rating and Reviews", error);
    }
    toast.dismiss(toastId);
    return;
}
export const getRatingAndReviewCourse = async (courseId) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", ratingNreviewEndpoints.GET_RATINGS_FOR_A_COURSE, {
            courseId: courseId,
        });
        console.log("Response", response);
        if (!response) {
            throw new Error("Error while fetching Rating and Reviews");
        }
        console.log("Rating and Reviews fetched successfully", response);
        // toast.success("Rating and Reviews fetched successfully");
        toast.dismiss(toastId);
        return response;
    } catch (error) {
        toast.error("Error while fetching Rating and Reviews");
        console.log("Error while fetching Rating and Reviews", error);
    }
    toast.dismiss(toastId);
    return;

}

