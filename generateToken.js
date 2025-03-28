const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

// Replace with actual user details
const user = {
    id: "123456",
    username: "testuser",
    email: "test@example.com",
    role: "admin"
};

// Generate a token
const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

console.log("🔹 Generated JWT Token:");
console.log(token);
