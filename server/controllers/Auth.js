const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


// send otp
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from req body
        const { email } = req.body;

        // ckeck the email if already exist
        const checkUserPresent = await User.findOne({ email });
        // if user already present then return a response 
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }

        // generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated :", otp);

        // check unique  otp or not 
        let result = await OTP.findOne({ otp: otp })
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        // create an entry for OTP in database
        const otpBody = await OTP.create(otpPayload);
        console.log("otpbody",otpBody);

        // return response 
        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate the Otp",
            message: error.message,
        });
    }
}

// signup 
exports.signup = async (req, res) => {
    try {
        // fetch the data from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // validation
        if (!firstName || !lastName || !email || !password || !confirmPassword
            || !contactNumber || !otp) {
            return res.status(401).json({
                success: false,
                message: "All fields are Required",
            })
        }

        // password matching 
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmPassword  does not Matched, Please try again ",
            });
        }

        // check user already exist or not 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered, Please try to login",
            });
        }

        // find the most recent OTP stored for the user
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recebt OTP", recentOtp);

        // validate Otp
        if (!recentOtp) {
            return res.status(404).json({
                success: false,
                message: "OTP Not Found"
            });
        }
        else if (otp !== recentOtp.otp) {
            // invalid Otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }


        // hashing of password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hashed password",hashedPassword)

        // entry creation in database 
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber,
        });

        // entry creation in Database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            accountType,
            approved: accountType === "Expert" ? false : true,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        });

        // return response 
        return res.status(200).json({
            success: true,
            message: accountType === "Expert" 
            ?"Signup Successfull. Wait for the Admin approval"
            :"Signup Successful, Please Login",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered,Please try again",
        });
    }
}

// login
exports.login = async (req, res) => {
    try {
        // get data from req body
        const { email, password } = req.body;

        // validation of data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required ,please try again",
            });
        }

        // user check exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered ,Please signup first",
            });
        }

        // generate Jwt ,after password matching 
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
                approved: user.approved,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;


            // create cookie and send response 

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Logged In Successfully",
                token,
                user,
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure ,Please try again",
        });
    }
}

// change password 
exports.changePassword = async (req, res) => {
    try {
        // get data from req body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "All fields are require",
            });
        }

        // validate the newpassword and confirm password
        if (newPassword !== confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "Newpassword and confirm password do not match",
            });
        }

        // validate the old password (for validating the password we should find the passwaor from DB)
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password do not match",
            });
        }

        // hashed the password 
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update password in Database
        await user.updateOne({ password: hashedPassword });

        // send email - password updated
        const emailresponse = await mailSender(user.email,
             "Password Updated",
              passwordUpdated(user.email,user.firstName,user.lastName));
        console.log("Email-password updated", emailresponse);

        // return response 
        return res.status(200).json({
            success: true,
            message: "Password has been Changes successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "password cannot changes, Please try Again Later",
        })
    }
}