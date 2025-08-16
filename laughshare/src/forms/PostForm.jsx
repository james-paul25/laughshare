import React from "react";
import { handleSubmit } from "../services/postService";

const PostForm = ({user, category, setCategory, content, setContent, navigate}) => {

    return (
        <form onSubmit={handleSubmit({
            category: category,
            content: content,
            setContent: setContent,
            user: user,
            navigate: navigate
        })}
            className="p-4 max-w-md w-full mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Post a New Joke
            </h2>

            <label className="block mb-4">
                <span className="block mb-1 font-medium">Category:</span>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full p-2 border-2 border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <option>Funny</option>
                    <option>Tech Jokes</option>
                    <option>Dad Jokes</option>
                    <option>Puns</option>
                    <option>Dark Humor</option>
                </select>
            </label>

            <label className="block mb-4">
                <span className="block mb-1 font-medium">Joke:</span>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full p-2 border-2 border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    rows="4"
                    required
                />
            </label>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition cursor-pointer"
            >
                Post
            </button>
        </form>
    );
}

export default PostForm;