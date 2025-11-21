// Import UI Components
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";


const API_URL= import.meta.env.VITE_API_URL || "";
    // Import UI Components

    export default function PostCard({ post, onCreate }) {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [draft, setDraft] = useState({
            title: post?.title ?? "",
            content: post?.content ?? "",
        });
        const [posts, setPosts] = useState([]);

        useEffect(() => {
            fetchPosts();
        }, []);

        async function fetchPosts() {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) { 
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            }
        }

        function handleChange(e) {
            const { name, value } = e.target;
            setDraft((d) => ({ ...d, [name]: value }));
        }

        async function handleSubmit(e) {
            e.preventDefault();
            setIsSubmitting(true);
            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(draft),
                });
                if (!res.ok) throw new Error(await res.text());
                const created = await res.json();
                setDraft({ title: "", content: "" });
                setPosts((prevPosts) => [created, ...prevPosts]); // Prevents network delay of fetchPosts()
                if (typeof onCreate === "function") onCreate(created);
                await fetchPosts();
            } catch (err) {
                console.error("Failed to create post:", err);
            } finally {
                setIsSubmitting(false);
            }
        }
    

        return (
            <>
                {/* Create post form */}
                <Card className="w-full max-w-lg mx-auto my-4">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Create a post</h2>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <Input
                                name="title"
                                placeholder="Title"
                                value={draft.title}
                                onChange={handleChange}
                                required
                            />
                            <Textarea
                                name="content"
                                placeholder="Write your post here..."
                                value={draft.content}
                                onChange={handleChange}
                                rows={6}
                                required
                            />
                            <div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Posting..." : "Post"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* List of posts fetched from DB */}
                <div className="w-full max-w-lg mx-auto my-4 space-y-4">
                    {posts.length === 0 ? (
                        <p className="text-center text-gray-500">No posts yet.</p>
                    ) : (
                        posts.map((p) => (
                            <Card key={p.id ?? p._id} className="w-full">
                                <CardHeader>
                                    <h3 className="text-lg font-semibold">{p.title}</h3>
                                    <p className="text-sm text-gray-500">Posted by: {p.pseudonymID}</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-wrap">{p.content}</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </>
        );
    }



