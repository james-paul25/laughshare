// File: src/pages/Home.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchJokes = async () => {
      const jokeCollection = await getDocs(collection(db, "jokes"));
      setJokes(
        jokeCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchJokes();
  }, []);

  const handleLike = async (id, likes) => {
    const jokeRef = doc(db, "jokes", id);
    await updateDoc(jokeRef, { likes: likes + 1 });
    setJokes((prev) =>
      prev.map((j) => (j.id === id ? { ...j, likes: likes + 1 } : j))
    );
  };

  const filteredJokes =
    filter === "All" ? jokes : jokes.filter((j) => j.category === filter);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Latest Jokes</h2>

      <select
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option>All</option>
        <option>Funny</option>
        <option>Dad Jokes</option>
        <option>Puns</option>
        <option>Dark Humor</option>
      </select>

      {filteredJokes.map((joke) => (
        <div key={joke.id} className="border-b py-2">
          <p className="font-medium">Category: {joke.category}</p>
          <p>{joke.content}</p>
          <button
            onClick={() => handleLike(joke.id, joke.likes || 0)}
            className="text-blue-500 text-sm"
          >
            Like ({joke.likes || 0})
          </button>
        </div>
      ))}
    </div>
  );
}
