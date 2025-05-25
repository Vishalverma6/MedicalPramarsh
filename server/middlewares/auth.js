const jwt = require("jsonwebtoken");
require("dotenv").config();


// auth
exports.auth = async (req, res, next) => {
    try {
        // extract the token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization")?.replace("Bearer ", "").trim();

        // if token missing ,then send response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
        } catch (error) {
            // verification issue
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token ",
        });
    }
}

// ispatient 
exports.isPatient = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Patient") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Patient only",
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified ,please try again later",
        });
    }
}

// isExpert/Doctor
exports.isExpert = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Expert") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Expert only",
            });
        }

        // checking the admin approval
        if (!req.user.approved) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Expert not approved yet."
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified ,please try again later",
        });
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only",
            });

        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified ,please try again later",
        });
    }
}

// is expert of admin both 
exports.isAdminOrExpert = async(req, res ,next)=> {
    try {

        const role = req.user.accountType;

        if (role !== "Expert" && role !=="Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Expert and Admin only",
            });
        }

        // checking the admin approval
        
        if (role==="Expert"&& !req.user.approved) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Expert not approved yet."
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified ,please try again later",
        });
    }
}