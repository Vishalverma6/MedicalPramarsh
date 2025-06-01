const reportReviewedTemplate = require("../mail/templates/reportReviewedTemplate");
const reportUploadedTemplate = require("../mail/templates/reportUploadedTemplate");
const Report = require("../models/Report");
const User = require("../models/User");
const { report } = require("../routes/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mailSender = require("../utils/mailSender");
const sendWhatsAppTemplateMessage = require("../utils/sendWhatsAppTemplateMessage");

require("dotenv").config();



exports.submitReport = async (req, res) => {
    try {
        // fetch the data from req body
        const { description, phoneNumber, reportType, } = req.body;

        const { id } = req.user;

        console.log("userId", id);

        const medicalReport = req.files?.report;
        console.log("medical Report", medicalReport)

        // validation
        if (!id || !medicalReport || !phoneNumber) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }
        // console.log("vishal 1");

        // upload report to cloudinary
        const medicalReportFile = await uploadImageToCloudinary(medicalReport, process.env.FOLDER_NAME);
        console.log("medicalReportFile", medicalReportFile);

        console.log("vishal2")

        // Create and save a new report document
        const newReport = await Report.create({
            patient: id,
            phoneNumber,
            reportType,
            reportUrl: medicalReportFile.secure_url,
            description,
        });

        // add the new report to the user schema of Patient 
        await User.findByIdAndUpdate(
            { _id: id },
            {
                $push: {
                    reports: newReport._id,
                }
            },
            { new: true },
        )

        // sending  notification
         const doctors =  await User.find({accountType:"Expert"});

         if(!doctors){
            return res.status(404).json({
                success:false,
                message:"User not found with accountType Expert"
            });
         }

        //  loop through each doctor and send notification
        doctors.forEach((doctor) => {
            if(doctor.notificationPreference === "email"){
                mailSender(doctor?.email,
                    "A New Report Uploaded",
                    reportUploadedTemplate(doctor.firstName, doctor.lastName, reportType)
                )
            }
           
            else if(doctor.notificationPreference === "whatsapp"){
                 console.log("contactNumber",doctor.contactNumber);
                sendWhatsAppTemplateMessage(doctor.contactNumber)
            }
        });


        // return response 
        return res.status(200).json({
            success: true,
            message: "Report Submitted Successfully",
            data: newReport
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "report submission Failed, please try again",
        })
    }
}

// get All Reports
exports.getAllReports = async (req, res) => {
    try {
        const allReports = await Report.find({});

        // return response
        return res.status(200).json({
            success: false,
            message: "All reports fetched Successfully",
            data: allReports,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot All reports,please try again",
            error: error.message,
        });
    }
}

// get Reports by Id 
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.reportId).populate("patient expert", "name email");

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        return res.status(200).json({
            success: true,
            report,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// get Reports by patient  Id
exports.getReportsByPatient = async (req, res) => {
    try {
        const { patientId } = req?.params;
        // console.log("patient id3 ", patientId)
        const reports = await Report.find({ patient: patientId })
            .populate("expert", "name email");

        // return response 
        return res.status(200).json({
            success: true,
            data: reports,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// get reports by experts
exports.getReportsByExpert = async (req, res) => {
    try {
        console.log("user", req.user);
        const expertId  = req.user.id;
        console.log("expert",expertId)

        if (!expertId) {
            return res.status(404).json({
                success: false,
                message: "ExpertId is required"
            });
        }


        const reports = await Report.find({ expert: expertId })
         .populate("patient", "name email");

        return res.status(200).json({
            success: true,
            data:reports,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// add review to report 
exports.addReviewToReport = async (req, res) => {
    try {
        // fetch the review from req body
        const { review } = req.body;

        const { id } = req.user;

        const { reportId } = req.params;

        const report = await Report.findByIdAndUpdate(
            reportId,
            {
                review,
                status: "Reviewed",
                expert:id,
            },
            { new: true }
        ).populate("patient expert", "firstName lastName email");

        console.log("report Details ", report);

        // validate 
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        // // add the reviewd report to expert schema 
        // await User.findByIdAndUpdate(
        //     { _id: id },
        //     {
        //         $push: {
        //             reports: reportId,
        //         }
        //     },
        //     { new: true },
        // )

        // send email response 
        const emailResponse = await mailSender(report?.patient?.email,
            "Report Reviewed",
            reportReviewedTemplate(report?.patient?.firstName, report?.patient?.lastName)
        ) ;



        // return response 
        return res.status(200).json({
            success: true,
            message: "Feedback added successfully and status updated to 'Reviewed'",
            data: report
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to add review",
        });
    }
}

// get pending reports
exports.getPendingReports = async (req, res) => {
    try {
        const reports = await Report.find({ status: "Pending" }).populate("patient", "name email");

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the pending reports",
            data: reports,
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "failed to fetched pending reports"
        })
    }
}

// delete Reports
exports.deleteReports = async (req, res) => {
    try {
        // fetch reportId from req body
        console.log("req body", req.body)
        const reportId = req?.body?.reportId;
        console.log("reportId", reportId);

        const report = await Report.findById(reportId);

        // validate 
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            })
        }

        // Ensure that only the patient who uploaded the report or admin can delete it
        if (report.patient.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delet the report"
            });
        }

        await Report.findByIdAndDelete(reportId);

        return res.status(200).json({
            success: true,
            message: "Report deleted successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to delete the Report,server error",
        });
    }
}

