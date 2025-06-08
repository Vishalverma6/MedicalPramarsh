const { data } = require("react-router-dom");
const expertApprovedTemplate = require("../mail/templates/expertApprovedTemplate");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");


exports.getPendingExpert = async (req, res) => {
    try {
        // fetch the pending experts from database 
        const pendingExperts = await User.find({ accountType: "Expert", approved: false })
            .select("-password -token");

        return res.status(200).json({
            success: true,
            message: "Pending experts fetched successfully",
            data: pendingExperts,
        });

    } catch (error) {
        console.error("Error fetching pending experts:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching pending experts",
        });
    }
}

exports.approveExpert = async (req, res) => {
    try {
        // fetch the expert id 
        const { expertId } = req.body;

        // find expert details
        const expert = await User.findById(expertId);

        // validate
        if (!expert) {
            return res.status(404).json({
                success: false,
                message: "User Not found",
            });
        }

        if (expert.accountType !== "Expert") {
            return res.status(400).json({
                success: false,
                message: "User is not an expert",
            });
        }

        expert.approved = true;
        await expert.save();

        // send the email to expert about access of their account 
        const emailResponse = await mailSender(expert?.email,
            "Account Approved",
            expertApprovedTemplate(expert?.firstName, expert?.lastName)
        );

        // return response 
        return res.status(200).json({
            success: true,
            message: "Expert approved Successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to approve Expert, server error",
        });
    }
}

exports.getApprovedExpert = async (req, res) => {
    try {
        const approvedExperts = await User.find({ approved: true, accountType: "Expert" }).select("-password");

        // validation
        if (!approvedExperts) {
            return res.status(404).json({
                success: false,
                message: "No Approved expert found",
            })
        }

        // return response 
        return res.status(200).json({
            success: true,
            data: approvedExperts,
        })
    }
    catch (error) {
        console.error("Error fetching approved experts:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch approved experts",
        });
    }
}
