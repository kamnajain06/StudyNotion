import { setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
const { endPoints } = require("../apis");


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    CHANGE_PASSWORD_API,
} = endPoints

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log('1');
        // dispatch(setLoading(true));
        console.log('2');
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            })
            // console.log("SendOtp API response >>>", response);
            // console.log(response.data.success);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Otp sent Successfully")
            navigate("/verify-email")
        } catch (err) {
            console.log("SendOtp API error >>> ", err);
            if (!err.response) {
                toast.error(err.message);
            } else {
                toast.error(err.response.data.message);
            }
        }
        toast.dismiss(toastId);
        // dispatch(setLoading(false));
    }
}

export const signup = (firstName, lastName, email, password, confirmPassword, accountType, otp, navigate) => {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...");
        // dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName, lastName, email, password, confirmPassword, accountType, otp
            })
            console.log("Signup API response >>>", response);
            console.log(response.data.success);
            if (!response.data.success) {
                dispatch(setLoading(false));
                // toast.dismiss(toastId);
                return toast.error(response.data.message);
            }
            // toast.dismiss(toastId);
            dispatch(setLoading(false))
            toast.success("Signup Successful");
            navigate("/login");
        } catch (err) {
            // dispatch(setLoading(false))
            // toast.dismiss(toastId);
            console.log("Signup API ERROR............", err)
            if (!err.response) {
                toast.error(err.message);
            } else {
                toast.error(err.response.data.message);
            }
        }
    }
}

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })
            console.log("Login API response >>>", response);
            console.log(response.data.success);
            if (!response.data.success) {
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                return toast.error(response.data.message);
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.user.token))
            dispatch(setUser(response.data.user))
            console.log(response.data.user)
            localStorage.setItem("token", JSON.stringify(response.data.user.token));
            console.log(response.data.user.token);
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        } catch (err) {
            console.log("LOGIN API ERROR............", err)
            if (!err.response) {
                toast.error(err.message);
            } else {
                toast.error(err.response.data.message);
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return dispatch => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out");
        navigate("/")
    }
}

export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
            console.log("Reset Password Token Response : ", response);
            if (!response.data.success) {
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                return toast.error(response.data.message);
            }
            toast.success("Reset Password Token sent Successfully");
            setEmailSent(true);
        } catch (err) {
            console.log("Error in sending reset password token", err);
            toast.error(err);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const resetPassword = (formData, token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        const { password, confirmPassword } = formData;
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });
            console.log("Reset Password Response : ", response);
            if (!response.data.success) {
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                return toast.error(response.data.message);
            }
            toast.success(" Password reset Successfully");
        } catch (err) {
            console.log("Error in reset password", err);
            toast.error(err);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
        navigate('/login');
    }
}

export const changePassword = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CHANGE_PASSWORD_API,formData, {
                Authorization: `Bearer ${token}`
            });
            console.log("Change Password Response : ", response);
            if (!response.data.success) {
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                return toast.error(response.data.message);
            }
            toast.success(" Password changed Successfully");
        } catch (err) {
            console.log("Error in change password", err);
            toast.error(err);
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

