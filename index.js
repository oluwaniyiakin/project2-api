require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const itemsRoutes = require("./routes/items"); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Load Swagger JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// Serve Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log("📖 API Documentation available at: /api-docs");

// Routes
app.use("/items", itemsRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 API is live and working!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
