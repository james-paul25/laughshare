import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { useAuth } from "../contexts/useAuth";
import JokeContainer from "../components/JokeContainer";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [filter, setFilter] = useState("All");
  const { user } = useAuth();

  useEffect(() => {
    const fetchJokes = async () => {
      const jokeRef = await collection(db, "jokes");
      const jokesQuery = query(jokeRef, orderBy("createdAt", "desc"));
      const jokeSnapshot = await getDocs(jokesQuery);
      setJokes(
        jokeSnapshot.docs.map((doc) => ({
          id: doc.id,
          likedBy: [],
          ...doc.data(),
        }))
      );
    };
    fetchJokes();
  }, []);

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
          <option>Tech Jokes</option>
          <option>Dad Jokes</option>
          <option>Puns</option>
          <option>Dark Humor</option>
        </select>
      </div>

      <JokeContainer
        user={user}
        filteredJokes={filteredJokes}
        doc={doc}
        db={db}
        updateDoc={updateDoc}
        setJokes={setJokes}
      />
    </div>
  );
}
