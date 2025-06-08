import toast from "react-hot-toast";
import { reportEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
    UPLOAD_REPORT_API,
    GET_ALL_REPORTS_API,
    GET_REPORT_BY_REPORTID_API,
    GET_REPORT_BY_PATIENTID_API,
    GET_REPORT_BY_EXPERTID_API,
    ADD_REVIEW_API,
    GET_PENDING_REPORT_API,
    DELETE_REPORT_API

} = reportEndpoints;

// uplaod report 
export const uploadReport = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPLOAD_REPORT_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("UPLOAD_REPORT_API...RESPONSE..", response);
        if (!response?.data?.success) {
            throw new Error("Could not Uplaod Report")
        }

        toast.success(response?.data?.message || "Report Submitted Succesfully")
        result = response?.data?.data;
        navigate("/report-submitted");
    } catch (error) {
        console.log("UPLOAD_REPORT_API API ERROR...", error);
        toast.error(error?.response?.data?.message)
    }

    toast.dismiss(toastId);
    return result
}

// get All Report api
export const getAllReports = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_REPORTS_API)
        if (!response.data.success) {
            throw new Error(response?.data?.message || "Could not fetch all Reports")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetched the report")
    }
    catch (error) {
        console.log("GET_ALL_REPORTS_API API ERROR .....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
};

// get All reports of a patient by patient id
export const getReportByPatientId = async (patientId, token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", `${GET_REPORT_BY_PATIENTID_API}/${patientId}`, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("GET_REPORT_BY_PATIENTID_API RESPONSE .....", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch the report")
        }
        toast.success(response?.data?.message || "Report Fetched  Successfully");
        result = response?.data?.data;
        // console.log("result 3", result)
    }
    catch (error) {
        console.log("GET_REPORT_BY_PATIENTID_API ERROR....", error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
    return result;
}


// delete report 
export const deleteReport = async (reportId, token) => {
    const toastId = toast.loading("Loading...");

    try {
        // console.log("reportIDD", reportId)
        const response = await apiConnector("DELETE", DELETE_REPORT_API, { reportId }, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_REPORT_API RESPONSE .....", response);
        if (!response?.data?.success) {
            throw new Error("Could not Delete Report")
        }
        toast.success(response?.data?.message || "Report deleted Successfully");

    } catch (error) {
        console.log("DELETE_REPORT_API ERROR....", error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
}

// get pending report
export const getPendingReports = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_PENDING_REPORT_API);

        console.log("GET_PENDING_REPORT_API RESPONSE", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch PEnding report")
        }
        // toast.success(response?.data?.message || "Pending Reports fetched Successfully")

        result = response?.data?.data;
        console.log("Result:", result)
    } catch (error) {
        console.log("GET_PENDING_REPORT_API API ERROR.....", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// add review
export const addReview = async (reportId, data, token, navigate) => {
    const toastId = toast.loading("Loading...");
    //   console.log("data, reportID, token", data, reportId, token);
    try {
        const response = await apiConnector(
            "POST",
            `${ADD_REVIEW_API}/${reportId}`,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        console.log("ADD_REVIEW_API RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Review ");
        }
        toast.success(response?.data?.message || "Review Added Successfully");
        navigate("/dashboard/pending-report");
    } catch (error) {
        console.log("ADD_REVIEW_API API ERROR.....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
};

// get report reviewed by expert
export const getReportReviewdByExpert = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        console.log("vishal123");
        console.log("token", token);
        const response  = await apiConnector("GET",GET_REPORT_BY_EXPERTID_API,null, {
           Authorization: `Bearer ${token}`,
        });

        console.log("GET_REPORT_BY_EXPERTID_API RESPONSE", response);
        if (!response?.data?.success) {
            throw new Error("Could Not fetchd the report ");
        }
        toast.success(response?.data?.message || "Report Fetched Successfully");
        result = response?.data?.data;
    }
    catch (error) {
        console.log("GET_REPORT_BY_EXPERTID_API API ERROR.....", error);
        toast.error(error.message);
    }
     toast.dismiss(toastId);
     return result;
}
