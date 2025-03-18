const express = require("express");
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemsController");

// GET all items
router.get("/", getAllItems);

// GET a single item by ID
router.get("/:id", getItemById);

// POST create a new item
router.post("/", createItem);

// PUT update an existing item
router.put("/:id", updateItem);

// DELETE removed an item
router.delete("/:id", deleteItem);

module.exports = router;
