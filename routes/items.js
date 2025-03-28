const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const itemsController = require("../controllers/itemsController"); // Ensure this is correct!

// Ensure all functions exist in itemsController
if (!itemsController.getAllItems) console.error("❌ Missing function: getAllItems");
if (!itemsController.getItemById) console.error("❌ Missing function: getItemById");
if (!itemsController.createItem) console.error("❌ Missing function: createItem");
if (!itemsController.updateItem) console.error("❌ Missing function: updateItem");
if (!itemsController.deleteItem) console.error("❌ Missing function: deleteItem");

// 🔹 Secure Routes with Authentication
router.get("/", verifyToken, itemsController.getAllItems);
router.get("/:id", verifyToken, itemsController.getItemById);
router.post("/", verifyToken, itemsController.createItem);
router.put("/:id", verifyToken, itemsController.updateItem);
router.delete("/:id", verifyToken, itemsController.deleteItem);

module.exports = router;
