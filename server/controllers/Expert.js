const User = require("../models/User")


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
        const { expertId } = req.params;

        // find expert details
        const user = await User.findById(expertId);

        // validate
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not found",
            });
        }

        if (user.accountType !== "Expert") {
            return res.status(400).json({
                success: false,
                message: "User is not an expert",
            });
        }

        user.approved = true;
        await user.save();

        // return response 
        return res.status(200).json({
            success: false,
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