const express = require("express");
const passportka = require("../passport");
const router = express.Router();


router.get("/",checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

function checkNotAuthenticated(req,res,next) {
  if(!req.isAuthenticated()){
    return next()
  }
  res.redirect('/dashboard')
}

/* function checkNotAuthenticated(req,res,next) {
  if(!req.isAuthenticated()){
    res.redirect('/')
  }
  return next()
} */


router.post(
  "/",
  passportka.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;