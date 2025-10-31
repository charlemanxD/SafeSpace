const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { checkToxicity } = require('../services/moderationService');


// @route Post /api/posts
// @Desc create a new Post
// @access Private (Requires TWT and auth Middleware)
exports.createPost = async (req, res) => {
    // Extract pseudonymID from the JWT token validated by the 'auth' middleware
    const { pseudonymID} = req.user;
    // Extract title and content from the request body
    const { content } = req.body;

    // --- PERSPECTIVE API checks(BEFORE saving the POST) ---

    try {
        //  1. CONTENT MODERATION CHECK
        const { isToxic, score } = await checkToxicity(content);

        if(isToxic) {
            console.warn(`Toxic Post detected from ${pseudonymID}. Score: ${score}`);
            

            // Block Post creation and inform User
            return res.status(400).json({
                msg: 'Post flagged as Harmful or Toxic. Please revise and Try again.',
                score: score
            });
        }

            // 2. Proceed with post creation if non-toxic
            const newPost = new Post({
            // title,
            content,
            pseudonymID
        });
        const post = await newPost.save(); // Save new post

        // FrontEnd response, Displays Post and posterID.
        res.status(201).json({
            post: content.createdAt,
            // post: post.createdAt,
            poster: pseudonymID
        });

    } catch (err) {
        // Backend response, if Post creation FAILS
        console.error('Error creating the Post:', err.message );
        // FrontEnd response, if post creation FAILS.
        res.status(200).send('Server error. Could not Create Post');
    }
};



// @route GET /api/posts
// @desc Get all posts (the feed)
// @access Public
exports.getAllPosts = async (req, res) => {
    try {
        // Fetch all posts, sorted by newest
        const posts = await Post.find({ status: 'active' })
        .sort({ createdAt: -1 });

        // Frontend Success response
        res.json(posts);
        } catch (err) {
        // Backend Failure Response
        console.error('Error getting all posts:', err.message);
        // FrontEnd Failure Response
        res.status(500).send('Server error. Could not retrive posts.')
    }
    
};




// @route GET /api/posts/:id
// @desc Get a single post by ID
// @access Public
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ msg: 'Post not found.' })
        }
        // FrontEnd Response
        res.json(post)
    } catch (err) {
        console.error('Error fetcing a single post:', err.message);

        // Response, if the ID isInvalid
        if (err.kind === 'objectId') {
            res.status(500).send('Server error. Could not retrieve post.')
        }
    }
};


// --------------- COMMENT LOGICS --------------- 


// @route POST /api/posts/:postId/comments
// @desc Add a comment to a specific post
// @access Private (Requires JWT)
exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const { pseudonymID } = req.user;


    // TODO -- INTEGREATE PERSPECTIVE API CHECKS


    try {
        //  1. Check if Post exist
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ mgs: 'Post not found' });
        }

        //  2. CONTENT MODERATION CHECK
        const { isToxic, score } = await checkToxicity(content);

        if(isToxic) {
            console.warn(`Toxic Comment detected from ${pseudonymID}. Score: ${score}`);

            // TODO: Phase 72-hour ban logic

            // Block Post creation and inform User
            return res.status(400).json({
                msg: 'Comment flagged as Harmful or Toxic. Please revise and Try again.',
                score: score
            });
        }




        // 3. Create the Comment if non-toxic
        const newComment = new Comment({
            postId,
            pseudonymID,
            content
        });

        await newComment.save(); // Save comment

        // 3.Update the Post's commentCount
        post.commentsCount += 1;
        await post.save();

        // Display comment
        res.status(201).json(newComment);
    } catch (err) {
        // Backend response, if Comment creation FAILS
        console.error('Error adding a new comment:', err.message);

        // FrontEnd response, if Comment creation FAILS
        res.status(500).send('Server error. Could not add comment.');
    }
};



// @route GET /api/posts/:postId/comments
// @desc Get all comments for a specific post
// @access Public
exports.getCommentsByPost = async (req, res) => {

    try {
        const comments = await Comment.find({ postId: req.params.postId, status: 'active' })
            .sort({ createdAt: 1 });
        res.json(comments);
    } catch (err) {
        // Backend response, if fetching Comments FAILS
        console.error('Error fetching comments:', err.message);
        // FrontEnd response, if fetching Comments FAILS
        res.status(500).send('Server error. Could not retrieve comments.');
    }
};



// --------------- LIKE/UNLIKE LOGICS --------------- 


// @route PUT /api/posts/:postId/like
// @desc Toggle like on a post
// @access Private (Requires JWT)
exports.toggleLike = async (req, res) => {
    const { postId } = req.params;
    const { pseudonymID } = req.body;

    try {
        //  1. Check if Post exist
        const post = await Post.findById(postId);
        if(!post) {
            res.status(404).json({ msg: 'Post not found.' })
        }
        // 2. Check if user (by pseudonymID) has already LIKED the Post
        const alreadyLiked = post.likes.includes(pseudonymID);

        if (alreadyLiked) {
            // REMOVE pseodnymID from the array
            post.likes = post.likes.filter(id => id !== pseudonymID);
            post.likesCount -= 1;
            await post.save();
            res.json({ 
                msg: 'Post Unliked.',
                likesCount: likesCount
            });
        } else {
            // LIKE: Add pseudonymID to the array
            post.likes.push(pseudonymID);
            post.likesCount += 1;
            await post.save();
            res.json({ 
                msg: 'Post liked.',
                likesCount: likesCount
            });
        }

    } catch (err) {
        // Backend response, if toggling Like button FAILS
        console. error('Error toggling Like:', err.message);

        // FrondEnd response, if toggling Like button FAILS
        res.status(500).send('Server Error. Could not process like action.');
    }   
};