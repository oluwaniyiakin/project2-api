const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("./config/passport"); // Import Passport config

dotenv.config();
const app = express();

// Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/items", require("./routes/items")); // ✅ Corrected to "items"

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ Error:", err));

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
