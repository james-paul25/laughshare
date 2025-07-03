import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

export default function PostJoke() {
  const [category, setCategory] = useState("Funny");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first.");

    await addDoc(collection(db, "jokes"), {
      category,
      content,
      likes: 0,
      createdAt: serverTimestamp(),
      userId: user.uid,
      username: user.displayName,
      photoURL: user.photoURL,
    });
    setContent("");
    alert("Joke posted!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md w-full mx-auto">
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
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Post
      </button>
    </form>
  );
}
