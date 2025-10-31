const mongoose = require('mongoose');

//'RESOURCE' Data Structure(skeleton)
const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    category: { 
        type: String, 
        enun: [ 'mental health', 'Legal', 'Wellness', 'Education', 'Career Support', 'General'],
        index: true },   // For fast category searches
    location: { type: String, default: 'Global' } // Can allow filtering by country later
},  { timestamps: true });

//  Creatimg the actual model 
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;