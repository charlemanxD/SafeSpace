const mongoose = require('mongoose');

//'RESOURCE' Data Structure(skeleton)
const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, 
        enun: { 'menatl helath': String,
            'Legal': String },
        required: true }
},  { timestamps: true });

//  Creatimg the actual model 
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
