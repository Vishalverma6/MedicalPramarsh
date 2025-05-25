const express = require("express");
const { auth } = require("../middlewares/auth");
const { updateProfile, deleteAccount, getUserDetails, updateDisplayPicture } = require("../controllers/Profile");
const router = express.Router();



// profile routes 

// routes for updating profile 
router.put("/update-profile", auth, updateProfile);

// routes for deleting profile 
router.delete("/delete-profile",auth, deleteAccount);

// routes for get user details 
router.get("/get-user-details",auth, getUserDetails);

// routes for updating display picture 
router.put("/update-display-picture", auth, updateDisplayPicture);


module.exports = router;