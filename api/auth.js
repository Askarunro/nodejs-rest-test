const express = require("express");
const router = express.Router();

const { schemaRegister, schemaLogin } = require("../service/schemas/users");
const { validateRequest } = require("../middlewares/validateRequest");
const { auth } = require("../middlewares/auth");
const { upload } =require('../middlewares/upload')

const { registerUser, loginUser, logoutUser, currentUser, avatarsUser, resendUser, confirmUser } = require("../controller/auth");

router.post("/register", validateRequest(schemaRegister), registerUser);

router.post("/login", validateRequest(schemaLogin), loginUser);

router.post("/logout", auth, logoutUser);

router.get("/current", auth, currentUser);

router.patch("/avatars", auth, upload, avatarsUser);

router.get("/verify/:verificationToken", confirmUser);

router.post("/verify", resendUser);

module.exports = router;
