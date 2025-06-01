const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Expert", "Patient"],
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    notificationPreference: {
        type: String,
        enum: ["email", "sms", "whatsapp"],
        default: "email",
        required: function () {
            return this.accountType === "Expert";
        },
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    resetPasswordExpires: {
        type: Date,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report",
        }
    ]

},
    { timestamps: true },
)

module.exports = mongoose.model("User", userSchema);