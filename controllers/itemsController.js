const Item = require("../models/item");

// ✅ Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: "Invalid item ID", error: error.message });
    }
};

// ✅ Create a new item
exports.createItem = async (req, res) => {
    try {
        const { name, category, price, description, quantity } = req.body;

        // Validation check
        if (!name || !category || !price || !quantity) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newItem = new Item({
            name,
            category,
            price,
            description,
            quantity,
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: "Failed to create item", error: error.message });
    }
};

// ✅ Update an item
exports.updateItem = async (req, res) => {
    try {
        const { name, category, price, description, quantity } = req.body;

        // Validation check
        if (!name || !category || !price || !quantity) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: "Failed to update item", error: error.message });
    }
};

// ✅ Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item", error: error.message });
    }
};
