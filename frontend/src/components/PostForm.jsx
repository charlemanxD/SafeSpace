import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function PostForm({ onCreate }) { 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [draft, setDraft] = useState({
        // title: "",
        content: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setDraft((d) => ({ ...d, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draft),
            });
            if (!res.ok) throw new Error(await res.text());
            const created = await res.json();
            setDraft({ title: "", content: "" });
            // Call the parent handler to update the feed
            if (typeof onCreate === "function") onCreate(created); 
        } catch (err) {
            console.error("Failed to create post:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full max-w-lg mx-auto my-4">
            <CardHeader>
                <h2 className="text-xl font-bold">Create a post</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* <Input name="title" placeholder="Title" value={draft.title} onChange={handleChange} required /> */}
                    <Textarea name="content" placeholder="Write your post here..." value={draft.content} onChange={handleChange} rows={6} required />
                    <div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Posting..." : "Post"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}