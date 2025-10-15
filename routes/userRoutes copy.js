const express = require('express');
const router = express.Router();
const User = require('../models/Post');


// FETCH 5 Latest  Posts
router.get('/', async(req, res) => {
    try {
        const posts = await User
        .aggregate([
            {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
            {"$sort": {"date": -1}},
            {"$limit": 5}
        ]).toArray();

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// CREATE a NEW Post
router.post('/', async(req, res) => {
    // collect user Data input
    const { title, content, pseudonymID } = req.body;
    try {
        // store user Data into the database
        const user = new Post({ title, content, pseudonymID });
        const saved = await user.save();
        
        // Final response
        res.status(201).json({
            message: 'Post CREATED Successfully! 👍',
            newPost: saved
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// UPDATE Post by _id
router.put('/:id', async(req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        );
        // Check if the Post was actually found and updated
        if (!updatedPost) {
            return res.status(404).json({ 
                message: 'Post NOT FOUND' });
        }
        // Final response
        res.status(200).json({  
            message: 'Post UPDATED Successfully! 👍',
            user: updatedPost // Send updatedPost back

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// DELETE Post by _id
router.delete('/:id', async(req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(
            req.params.id
        );
        res.json({  message: 'Post Deleted. Bye! Bye! 👋' });

         // Check if the Post was actually found and deleted
        if (!deletedUser) {
            return res.status(404).json({ 
                message: 'Post NOT FOUND' });
        }
        // Final response
        res.status(200).json({  
            message: 'Post Deleted. Bye! Bye! 👋',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// // FETCH a SPECIFIC User by _id
// router.get('/:id', async(req, res) => {
//     try {
//         const user = await User.findById(
//             req.params.id,
//         );
//         if (!user) {
//             return res.status(404).json({ message: 'User NOT FOUND' });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// module.exports = router;
module.exports = router;