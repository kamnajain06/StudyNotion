import React from "react";
import { profile } from "../apis";
import { toast } from 'react-hot-toast'
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import { logout } from "./authApi";

const {
    UPDATE_DISPLAY_PICTURE,
    UPDATE_PROFILE_API,
    DELETE_PROFILE,
    GET_PROFILE_API,
    GET_ALL_COURSES_API,
    GET_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA
} = profile;

export const updateProfile = (token, data) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            console.log(1);
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
                Authorization: `Bearer ${token}`
            })
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)

            const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(
                setUser({ ...response.data.user, image: userImage })
            )

            console.log("After update details -> ", { ...response.data.user, image: userImage })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Updated Successfully")
        } catch (err) {
            console.log("UPDATE_PROFILE_API API ERROR............", err)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export const getProfile = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            console.log(1);
            const response = await apiConnector("GET", GET_PROFILE_API, null, {
                Authorization: `Bearer ${token}`
            })
            console.log("GET_PROFILE_API RESPONSE............", response.data.userDetails);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Profile Fetched Successfully")
        } catch (err) {
            console.log("GET_PROFILE_API API ERROR............", err)
            toast.error("Could Not Fetch Profile")
        }
        toast.dismiss(toastId);
    }
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            // console.log("Token recieved :-> ", token);
            const response = await apiConnector("DELETE", DELETE_PROFILE, null, {
                Authorization: `Bearer ${token}`
            })
            console.log("DELETE_PROFILE_API RESPONSE............", response.data);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        } catch (err) {
            console.log("DELETE_PROFILE_API API ERROR............", err)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export async function getUserEnrolledCourses(token) {
    let result = [];
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", GET_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("Get enrolled courses API : ", response?.data);
        result = response?.data?.data;
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        // toast.success("Fetched Enrolled Courses Successfully");
        toast.dismiss(toastId);
    } catch (err) {
        toast.dismiss(toastId);
        console.log("Error occured while fetching Enrolled Courses ->>>", err);
        toast.error(err.message);
    }
    return result;
}

export const getInstructorData = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA, null, {
            Authorization: `Bearer ${token}`
        })
        if (!response.data.success) {
            toast.dismiss(toastId);
            toast.error(response.data.message);
            return;
        }
        console.log("Get enrolled courses API : ", response?.data);
        result = response?.data;
    } catch (err) {
        console.log("Error occured while fetching Enrolled Courses ->>>", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}
