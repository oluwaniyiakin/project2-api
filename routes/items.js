const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const itemsController = require("../controllers/itemsController");

// 🔹 Secure Routes with Authentication
router.get("/", verifyToken, itemsController.getAllItems);      // Get all items (Protected)
router.get("/:id", verifyToken, itemsController.getItemById);   // Get item by ID (Protected)
router.post("/", verifyToken, itemsController.createItem);      // Create an item (Protected)
router.put("/:id", verifyToken, itemsController.updateItem);    // Update an item (Protected)
router.delete("/:id", verifyToken, itemsController.deleteItem); // Delete an item (Protected)

module.exports = router;
