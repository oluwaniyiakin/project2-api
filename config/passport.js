const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config(); // Ensure .env variables are loaded

// 🔹 Debugging to check if environment variables are loaded
console.log("🔹 GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ Not Found");
console.log("🔹 GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Loaded" : "❌ Not Found");
console.log("🔹 GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL ? "✅ Loaded" : "❌ Not Found");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("🔹 Google Profile Received:", profile);

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
          });
          console.log("✅ New User Created:", user);
        } else {
          console.log("✅ Existing User Found:", user);
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ Google OAuth Error:", error);
        return done(error, null);
      }
    }
  )
);

// 🔹 Serialize User
passport.serializeUser((user, done) => {
  console.log("🔹 Serializing User:", user.id);
  done(null, user.id);
});

// 🔹 Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("🔹 Deserializing User:", user);
    done(null, user);
  } catch (error) {
    console.error("❌ Deserialize Error:", error);
    done(error, null);
  }
});

module.exports = passport;
