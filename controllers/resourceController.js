const Resource = require('../models/Resource');





// @route GET /api/resources
// @Desc Get all resources, optionally filtered by category
// @access Public
exports.getResources = async (req, res) => {

    try {
        const { category } = req.query; 

        let filter = {};

        // Filter object if category provided in the query
        if (category) {
            filter.category = category;
        }
        
            // Find resource matching the filter, sort alphabetically
            const resources = await Resource.find(filter).sort({ name: 1 });
            res.json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error.message);
        res.status(500).send('Server error. Could not retrieve resources');
    }
};


// @route GET /api/resources/categories
// @Desc Get list of all available categories
// @access Public
exports.getResourceCategories = async (req, res) => {
    
    try {
        // 
        const categories = await Resource.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send('Server error. Could not retrieve categories');
    }
};