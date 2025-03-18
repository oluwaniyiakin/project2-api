const express = require("express");
const router = express.Router();
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} = require("../controllers/itemsController"); // Ensure the path is correct

// ✅ CRUD Routes
router.get("/", getAllItems);        // Get all items
router.get("/:id", getItemById);      // Get a single item by ID
router.post("/", createItem);         // Create a new item
router.put("/:id", updateItem);       // Update an existing item
router.delete("/:id", deleteItem);    // Delete an item

module.exports = router;

