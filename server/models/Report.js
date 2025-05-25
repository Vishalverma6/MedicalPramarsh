const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reportType:{
        type:String,
        required:true,
    },

    description: {
        type: String,
    },
    reportUrl: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    review: {
        type: String,
    },
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    status: {
        type: String,
        enum: ["Pending", "Reviewed"],
        default: "Pending",
    },
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
