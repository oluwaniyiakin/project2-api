const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController'); // Ensure this path is correct

// Ensure functions exist in itemsController
router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
