const express = require("express");
const router = express.Router();

// const {
//     login,
//     signup,
//     sendOTP,
//     changePassword,
// } = require("../controllers/Auth");

const {sendOTP, login, signup, changePassword} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
  } = require("../controllers/resetPassword")

const {auth} = require("../middleware/auth");
const { uploadFile} = require("../controllers/uploadFile");

router.post("/login", login)

router.post("/signup", signup)

router.post("/sendotp", sendOTP)

router.post("/changepassword", auth, changePassword)

router.post("/reset-password-token", resetPasswordToken)

router.post("/reset-password", resetPassword)

//dummy route

router.post("/uploadFile", uploadFile);

module.exports = router;
