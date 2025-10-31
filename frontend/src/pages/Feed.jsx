import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import shadcn components
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
// import PostCard from '../components/PostCard';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [postError, setPostError] = useState(null);

    // function to update the comments list in the main state
    const handleCommentAdded = (postId, newComments) => {
        setPosts(prevPosts => 
            prevPosts.map(post => 
                post._id === postId ? { ...post, comments: newComments } : post
            )
        );
    };

    // --- Fetch Posts on Load (Feed Display Logic) ---
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Axios uses the token set in the AuthContext, which is great!
                const res = await axios.get('/api/posts');
                setPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // --- Post Creation Logic ---
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setPostError(null);
        if (!newPostContent.trim()) return;

        try {
            const res = await axios.post('/api/posts', { content: newPostContent });

            // Add the new post to the top of the feed and clear the form
            setPosts([res.data, ...posts]);
            setNewPostContent('');

        } catch (err) {
            const msg = err.response?.data?.msg || 'Failed to create post.';
            setPostError(msg);
        }
    };
    
    // --- Render Loading/Error States ---
    if (loading) {
        return <p className="text-center pt-10">Loading feed...</p>;
    }

    return (
        <div className="py-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                🤫 Anonymous Feed
            </h1>

            {/* Post Creation Form */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Share Your Thoughts</CardTitle>
                    <CardDescription>
                        Remember, all posts are anonymous. Be kind.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePostSubmit}>
                        <Textarea
                            placeholder="What's on your mind today?"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            required
                            className="mb-4"
                        />
                        {postError && <p className="text-sm text-red-500 mb-4">{postError}</p>}
                        <Button type="submit" className="w-full">
                            Post Anonymously
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Display Feed */}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard 
                        key={post._id} 
                        post={post} 
                        onCommentAdded={handleCommentAdded}
                    />
                ))
            ) : (
                <p className="text-center text-gray-500">No posts yet. Be the first to share!</p>
            )}
        </div>
    );
}

// --- Simple Post Display Component ---
const PostCard = ({ post }) => {
    // Format the date to be more readable
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, dateOptions);

    return (
        <Card className="mb-4">
            <CardContent className="pt-6">
                <p className="text-gray-800 mb-3 whitespace-pre-line">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-2 mt-3">
                    <span className="font-medium text-indigo-600">
                        {post.pseudonymID}
                    </span>
                    <span>
                        {formattedDate}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};