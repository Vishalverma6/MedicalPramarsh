const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();




exports.updateProfile = async (req, res) => {
    try {
        // fetch the data from req body
        const { dateOfBirth = "", about = "", contactNumber, gender, image = "" } = req.body;

        // get userId
        const id = req.user.id;

        // validation
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update Profile 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        // return response 
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update profile ,Please try again",
            error: error.message,
        });
    }
}

// delete Account 
// explore:- How can we schedule this delete operation
exports.deleteAccount = async (req, res) => {
    try {
        // fetch the User ID
        const id = req.user.id;
        console.log("User Id:", id)

        // validation
        const userDetails = await User.findById(id);
        console.log("userDetails", userDetails)
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not Found ",
            });
        }

        // delete profile 
        await Profile.findByIdAndDelete({ _id: userDetails?.additionalDetails });

        // deletee user 
        await User.findByIdAndDelete({ _id: id });

        // return response
        return res.status(200).json({
            success: true,
            message: "Account deleted Successfully ",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete account ,Please try again",
            error: error.message,
        });
    }
}

// find all details of a user 
exports.getUserDetails = async (req, res) => {
    try {
        // get user Id 
        const id = req.user.id;

        // validation and get User Details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "User data Fetched Successfully",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to find user details  ,Please try again",
            error: error.message,
        });
    }
}

// Update Display Picture 
exports.updateDisplayPicture = async (req, res) => {
    try {
        // fetched the diplay picture 
        const displayPicture = req.files.displayPicture;

        const userId = req.user.id;
        console.log("user Id", userId);

        const profileUpload = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME);
        console.log(profileUpload);

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: profileUpload?.secure_url },
            { new: true },
        )

        // return response 
        return res.status(200).json({
            success:true,
            message:"Profile picture Uploaded successfully",
            data:updatedProfile,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error occured while updating profile picture,Please try again",
        });
    }
}