const express = require("express");
const { auth, isAdmin } = require("../middlewares/auth");
const { getPendingExpert, approveExpert } = require("../controllers/Expert");
const router = express.Router();


// Routes to get pending experts
router.get("/get-pending-expert",auth,isAdmin,getPendingExpert);


// Routes to Approved Experts
router.post("/approve-expert",auth,isAdmin,approveExpert);





module.exports = router;