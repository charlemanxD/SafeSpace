const express = require('express');
const router = express.Router();
const User = require('../models/User');


// FETCH ALL Users
router.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// CREATE a NEW User
router.post('/', async(req, res) => {
    // collect user Data input
    const { username, email, password } = req.body;
    try {
        // store user Data into the database
        const user = new User({  username, email, password  });
        const saved = await user.save();
        
        // Final response
        res.status(201).json({
            message: 'User CREATED Successfully! 👍',
            newUser: saved
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// UPDATE User by _id
router.put('/:id', async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        );
        // Check if the user was actually found and updated
        if (!updatedUser) {
            return res.status(404).json({ 
                message: 'User NOT FOUND' });
        }
        // Final response
        res.status(200).json({  
            message: 'User UPDATED Successfully! 👍',
            user: updatedUser // Send updatedUser back

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// DELETE User by _id
router.delete('/:id', async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(
            req.params.id
        );
        res.json({  message: 'User Deleted. Bye! Bye! 👋' });

         // Check if the user was actually found and updated
        if (!deletedUser) {
            return res.status(404).json({ 
                message: 'User NOT FOUND' });
        }
        // Final response
        res.status(200).json({  
            message: 'User Deleted. Bye! Bye! 👋',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// FETCH a SPECIFIC User by _id
router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(
            req.params.id,
        );
        if (!user) {
            return res.status(404).json({ message: 'User NOT FOUND' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// module.exports = router;
module.exports = router;