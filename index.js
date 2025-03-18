require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemsRoutes = require('./routes/items'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Routes
app.use('/items', itemsRoutes);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

app.get("/", (req, res) => {
    res.send("🚀 API is live and working!");
  });
  
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
