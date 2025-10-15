const mongoose = require('mongoose');

// 'POST' Data Structure(skeleton)
const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    pseudonymID: { type: String, required: true, index: true },

    // Array to store the pseudonymIDs of users who liked the post
    likes: [{type: String, index: true}],

    // Interaction counters (for quick querying)
    likesCount: { type: Number, default: 0},

    commentsCount: { type: Number, default: 0 },
    
    // Status for moderation (e.g., 'active', 'flagged', 'archived')
    status: { type: String, default: 'active' },
},  { timestamps: true });

//  Creatimg the actual model 
const Post = mongoose.model('Post', postSchema);

module.exports = Post;