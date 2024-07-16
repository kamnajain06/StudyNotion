const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const contactRoutes = require("./routes/ContactUs");

require("dotenv").config();

const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary")
const cookieParser = require("cookie-parser");

//required to run frontend on the samehost
const cors = require("cors")

const fileUpload = require("express-fileupload");
const Category = require("./models/Category");

const PORT = process.env.PORT || 4000;

//database connection
database.dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"https://study-notion-one-xi.vercel.app",
        credentials: true,
    })
);
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

//cloudinary connection
cloudinaryConnect();

//mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1",contactRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default route
app.get("/", (req,res)=> {
    res.send("<div>Helloo !!</div>");
})

app.listen(PORT, ()=> {
    console.log(`PORT is listening at ${PORT}`)
});





