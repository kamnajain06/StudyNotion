import { apiConnector } from "../apiconnector";
import { studentEndPoints } from "../apis";
import rzp_logo from "../../assets/Logo/rzp_logo.png"
import toast from "react-hot-toast";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL
} = studentEndPoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    })
}

export const buyCourse = async (token,courses, userDetails,navigate, dispatch) => {
    console.log("Courses Array: ", courses)
    const toastId = toast.loading("Loading...");
    try {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!response) {
            toast.error("Can't initiate payment");
            return;
        }
        // initiate the order
        const orderRes = await apiConnector("POST", COURSE_PAYMENT_API,{courses}, {
            Authorization: `Bearer ${token}`,
        })
        if (!orderRes.data.success) {
            throw new Error(orderRes.data.message);
        }

        console.log("OrderRes", orderRes);

        // options
        const options = {
            key: "rzp_test_Uz4oJdIXlwB32Z",
            currency: orderRes?.data?.paymentResponse?.currency,
            amount: orderRes?.data?.paymentResponse?.amount,
            order_id: orderRes?.data?.paymentResponse?.id,
            name: "StudyNotion",
            description: "Thank You for purchasing the course",
            image: rzp_logo,
            handler: function (response) {
                // send successful email
                sendPaymentSuccessEmail(response, orderRes?.data?.paymentResponse?.amount , token);

                // verify payment
                verifySignature({ ...response, courses }, navigate, dispatch, token);
            },
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("Payment Failed");
            console.log(response.error);
        })

    } catch (err) {
        console.log("Error while buying Course", err);
        toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount, token) {
    console.log("Response", response);
    try {
        const res = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`,
        })
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
    } catch (err) {
        console.log("Error while sending payment success email", err);

    }
}

async function verifySignature(bodyData, navigate, dispatch, token) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try {
        const res = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        toast.success("You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (err) {
        console.log("Error while verifying payment", err);
        toast.error("Couldn't verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}