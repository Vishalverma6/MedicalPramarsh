const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require('cors');


const userRoutes = require('./routes/User');
const expertRoutes = require("./routes/Expert");
const reportRoutes = require("./routes/Report");
const profileRoutes = require("./routes/Profile");


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");



// database connection
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"*",
        // http://localhost:5173
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// cloudinary connect
cloudinaryConnect();

// routes 
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/report",reportRoutes);
app.use("/api/v1/expert",expertRoutes);

// default route
app.use("/",(req, res)=> {
    return res.json({
        success:true,
        message:"Your server is up and running...",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})