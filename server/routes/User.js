const express = require("express");
const { signup, login, sendOTP, changePassword } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const router = express.Router();


// routes for signup
router.post("/signup",signup);

// routes for login
router.post("/login",login);

// routes for sending OTP to the user email
router.post("/send-otp", sendOTP);

// routes for changing the password 
router.post("/change-password",auth,changePassword);

// reset password 

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// routes for reset password
router.post("/reset-password", resetPassword);


// export the router for use in the main application
module.exports = router;