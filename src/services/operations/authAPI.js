import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";


const {
    SENDOTP_API,
    LOGIN_API,
    SIGNUP_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        console.log("vishal1")
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try {
            console.log("vishal2")
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            })
            console.log("vishal3")
            console.log("SENDOTP API RESPONSE......", response)
            // console.log(response.data.success)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            if (navigate) {
                navigate("/verify-email")
            }

        } catch (error) {
            console.log("SENDING API ERROR.....", error)
            toast.error(error?.response?.data?.message || 'Could not Send OTP')
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signup(
    accountType,
    firstName,
    lastName,
    email,
    contactNumber,
    password,
    confirmPassword,
    otp,
    // notificationPreference,
    navigate,
) {
    return async (dispatch) => {
        // console.log("data",accountType, firstName,lastName,email,phoneNumber,password, confirmPassword,otp)
        const toastId = toast.loading("Loading..")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                contactNumber,
                email,
                password,
                confirmPassword,
                // notificationPreference,
                otp,
            })
            console.log("SIGNUP API RESPONSE ....", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success(response?.data?.message || "Signup Successful, Please Login")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR....", error)
            toast.error(error?.response?.data?.message || "Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email, password,
            })
            console.log("LOGIN API RESPONSE....", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))

            const userImage = response?.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName || "unknown"} ${response.data.user.lastName || "user"}`;
            console.log("userImage ...", userImage);

            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/home")

        } catch (error) {
            console.log("LOGIN API ERROR ......", error)
            toast.error(error?.response?.data?.message || "Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, { email });
            console.log("RESET PASSWORD TOKEN RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email sent");
            setEmailSent(true);

        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error)
            toast.error("error while sending email")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// reset Password 
export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

            console.log("RESET PAssword response:", response)
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("password reset successfully")
            navigate("/confirmation")
        } catch (error) {
            console.log("RESET PASSWORD tOKEN ERROR ", error)
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}

// logout
export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out Successfully")
        navigate("/");
    }
}