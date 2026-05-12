const User  = require("../models/user.js");
const session = require("express-session");

module.exports.renderSignup = (req, res) => {
   res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try{
       let {username, email, password} = req.body;
       const newUser =  new User({email, username});
       const registeredUser =  await User.register(newUser, password);
       console.log(registeredUser);
       req.login(registeredUser, (err) => {
          if(err){
            return next(err);
          }
           req.flash("success", "Welcome to waunderList");
           res.redirect("/listings");
        });
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginForm = async(req, res) => {
       res.redirect("/listings");
       req.flash("success", "Welcome to waunderLust");
};

module.exports.logout =  (req, res) => {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
};