const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// GET /api/resources - GEt all or filtered resources
router.get('/', resourceController.getResources);

// GET /api/resources/categories - Get a list of all available categories.
router.get('/categories', resourceController.getResourceCategories);


module.exports = router;