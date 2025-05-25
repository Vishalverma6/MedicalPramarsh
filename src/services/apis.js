
export const BASE_URL = import.meta.env.VITE_BASE_URL; 

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/send-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// profile Endpoints 
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/get-user-details",

}

// SETTINGS page API
export const settingsEndpoints = {
    CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/update-display-picture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/update-profile",
    DELETE_PROFILE_API: BASE_URL + "/profile/delete-profile",
}

// Reports endpoints 
export const reportEndpoints = {
    UPLOAD_REPORT_API: BASE_URL + "/report/upload-report",
    GET_ALL_REPORTS_API: BASE_URL + "/report/get-all-reports",
    GET_REPORT_BY_REPORTID_API: BASE_URL + "/report/get-report-by-reportId",
    GET_REPORT_BY_PATIENTID_API:BASE_URL + "/report/get-report-by-patientId",
    GET_REPORT_BY_EXPERTID_API:BASE_URL + "/report/get-report-by-expertId",
    ADD_REVIEW_API: BASE_URL + "/report/add-review",
    GET_PENDING_REPORT_API : BASE_URL + "/report/get-pending-reports",
    DELETE_REPORT_API : BASE_URL + "/report/delete-report",
}

// export endpoints 
export const exportEndpoints = {
    GET_PENDING_EXPERT_API : BASE_URL + "/expert/get-pending-expert",
    APPROVE_EXPERT_API: BASE_URL + "/expert/approve-expert",
}