const express  = require("express");
const { auth, isPatient, isAdmin, isExpert, isAdminOrExpert } = require("../middlewares/auth");
const { submitReport, getAllReports, getReportById, getReportsByPatient, getReportsByExpert, addReviewToReport, getPendingReports, deleteReports } = require("../controllers/Report");
const router = express.Router();



// routes for submitting the Report
router.post("/upload-report",auth, isPatient, submitReport);

// routes to  get all reports 
router.get("/get-all-reports",auth,isAdmin,getAllReports);

// routes to get report by id
router.get("/get-report-by-reportId/:reportId",getReportById);

// routes to get reports by patient Id
router.get("/get-report-by-patientId/:patientId",getReportsByPatient);

// routes to get report reviewed by experts 
router.get("/get-report-by-expertId",auth,isAdminOrExpert,getReportsByExpert);

// routes to add review in report
router.post("/add-review/:reportId",auth,isExpert,addReviewToReport);

// routes for pending reports 
router.get("/get-pending-reports",getPendingReports);

// routes to delete the report
router.delete("/delete-report",auth,deleteReports);



module.exports = router;