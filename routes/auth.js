const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// 🔹 Google OAuth Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔹 Google OAuth Callback Route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true, secure: true });
        res.redirect("/dashboard"); // Redirect to a protected page
    }
);

// 🔹 Logout Route
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.logout(() => {
        res.redirect("/");
    });
});

module.exports = router;
