const jwt = require("jsonwebtoken");

//auth
//check authentication by verifying json web token
//token can be extracted by three ways body(avoided),cookie,header(token-bearer)=> secured way

exports.auth = async( req,res,next) => {
    try{
        //extract token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        //if token missing
        // console.log("token from backend", token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }
        //verify token using secret key
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            // console.log("Decoded JWT : ", decode);
            req.user = decode;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json(
            {
                success:false,
                message:"Something went wrong while validating the token"
            }
        )
    }
}
//isStudent
exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.role!="Student"){
            return res.status(404).json({
                success:false,
                message:"Protected route for Students",
            })
        }
        next();
    }catch(err){
        return res.status(404).json({
            success:false,
            message:"User role not matching",
        })
    }
}
//iaInstructor
exports.isInstructor = async (req,res, next) => {
    try{
        if(req.user.role !== "Instructor"){
            return res.status(404).json({
                success:false,
                message:"Protected Route for Instructors",
            })
        }
        next();
    }catch(err){
        return res.status(404).json({
            success:false,
            message:"User role not matching ",
        })
    }
}

//admin
exports.isAdmin = async (req,res, next) => {
    try{
        console.log("ROLE: ", req.user.role)
        if(req.user.role !== "Admin"){
            return res.status(404).json({
                success:false,
                message:"Protected Route for Admin",
            })
        }
        next();
    }catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"User role not matching ",
        })
    }
}