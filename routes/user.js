const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");
const session = require("express-session");


router.use(passport.session());

router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signup));


router.route("/login")
.get(userController.login)
.post(
     saveRedirectUrl,
     passport.authenticate("local",  {
     failureRedirect: "/login", 
     failureFlash: true,
     }) ,userController.loginForm);

router.get("/logout", userController.logout);

module.exports = router;