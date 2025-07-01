// File: src/pages/PostJoke.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
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
    });
    setContent("");
    alert("Joke posted!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Post a New Joke</h2>
      <label className="block mb-2">
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full p-2"
        >
          <option>Funny</option>
          <option>Dad Jokes</option>
          <option>Puns</option>
          <option>Dark Humor</option>
        </select>
      </label>
      <label className="block mb-4">
        Joke:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-2"
          rows="4"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </form>
  );
}
