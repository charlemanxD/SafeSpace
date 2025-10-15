const mongoose = require('mongoose');
const { Schema } = mongoose;

// 'COMMENT' Data Structure(skeleton)
const commentSchema = new mongoose.Schema({
    postId: { type: Schema.Types.ObjectId, 
        ref: 'Post',
        required: true,
        index: true }, // For effective look up by Post
        
    pseudonymID: { type: String, 
        required: true, 
        index: true }, // To find all comments by a user.

    content: { 
        type: String, 
        required: true, 
        trim: true
    }, 

    status: {
        type: String,
        dafault: 'active'
    }
    
},  { timestamps: true });

//  Creatimg the actual model 
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

