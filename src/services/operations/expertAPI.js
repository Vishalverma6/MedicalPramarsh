import toast from "react-hot-toast";
import { exportEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
    GET_PENDING_EXPERT_API,
    APPROVE_EXPERT_API,
} = exportEndpoints;


// pending expert Api
export const getPendingExpert = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = [];
    try {
        const response = await apiConnector("GET", GET_PENDING_EXPERT_API, null, {
            Authorization:`Bearer ${token}`
        });

        console.log("GET_PENDING_EXPERT_API API RESPONSE", response)
        if (!response.data.success) {
            throw new Error(response?.data?.message || "Could not fetch pending expert");
        }

        result = response?.data?.data;
        // toast.success(response?.data?.message || "Successfully fetched the pending expert")
    }
    catch (error) {
        console.log("GET_PENDING_EXPERT_API API ERROR .....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result;
}

// approve Expert 
export const approveExpert = async (expertId, token) => {
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", APPROVE_EXPERT_API, {expertId}, {
            Authorization: `Bearer ${token}`
        })

        console.log("APPROVE_EXPERT_API API RESPONSE", response)

        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.success(response?.data?.message)
    } catch (error) {
        console.log("APPROVE_EXPERT_API API ERROR.....", error)
        toast.error(error.message)
    }
     toast.dismiss(toastId)
}