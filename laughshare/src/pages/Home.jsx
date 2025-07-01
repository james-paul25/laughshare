// File: src/pages/Home.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [filter, setFilter] = useState("All");
  const { user } = useAuth();

  useEffect(() => {
    const fetchJokes = async () => {
      const jokeCollection = await getDocs(collection(db, "jokes"));
      setJokes(
        jokeCollection.docs.map((doc) => ({
          id: doc.id,
          likedBy: [], // fallback
          ...doc.data(),
        }))
      );
    };
    fetchJokes();
  }, []);

  const handleLike = async (id, likes, likedBy = []) => {
    if (!user) {
      alert("Please login to like jokes.");
      return;
    }

    const jokeRef = doc(db, "jokes", id);
    const hasLiked = likedBy.includes(user.uid);

    const updatedLikedBy = hasLiked
      ? likedBy.filter((uid) => uid !== user.uid)
      : [...likedBy, user.uid];

    const newLikes = hasLiked ? likes - 1 : likes + 1;

    await updateDoc(jokeRef, {
      likes: newLikes,
      likedBy: updatedLikedBy,
    });

    setJokes((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, likes: newLikes, likedBy: updatedLikedBy } : j
      )
    );
  };

  const filteredJokes =
    filter === "All" ? jokes : jokes.filter((j) => j.category === filter);

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-xl font-semibold mb-2">Latest Jokes</h2>

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-yellow-300 rounded"
        >
          <option>All</option>
          <option>Funny</option>
          <option>Dad Jokes</option>
          <option>Puns</option>
          <option>Dark Humor</option>
        </select>
      </div>

      {filteredJokes.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        <div className="max-w-2xl mx-auto px-4">
          {filteredJokes.map((joke) => {
            const isLiked = user && joke.likedBy?.includes(user.uid);

            return (
              <div
                key={joke.id}
                className="border-2 border-yellow-300 rounded-md p-4 mb-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {joke.photoURL && (
                      <img
                        src={joke.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                    )}
                    <p className="text-sm text-gray-700">
                      Posted by {joke.username}
                    </p>
                  </div>
                  {joke.createdAt && (
                    <p className="text-xs text-gray-500">
                      {new Date(joke.createdAt.seconds * 1000).toLocaleString()}
                    </p>
                  )}
                </div>

                <p className="font-medium">Category: {joke.category}</p>
                <p>{joke.content}</p>

                <button
                  onClick={() =>
                    user
                      ? handleLike(joke.id, joke.likes || 0, joke.likedBy || [])
                      : alert("Please login to like jokes.")
                  }
                  className={`text-sm flex items-center gap-1 mt-2 transition ${
                    user
                      ? isLiked
                        ? "text-red-500 hover:text-red-600"
                        : "text-blue-500 hover:text-blue-600"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <HandThumbUpIcon className="w-4 h-4" />
                  {isLiked ? "Unlike" : "Like"} ({joke.likes || 0})
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
