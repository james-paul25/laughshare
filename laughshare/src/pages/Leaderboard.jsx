import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase";
import { Trophy } from 'lucide-react';
import LeaderboardTable from "../components/LeaderboardTable";

export default function Leaderboard() {
  const { user } = useAuth();
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      if (!user) return;

      const jokesRef = collection(db, "jokes");
      const jokesQuery = query(jokesRef, orderBy("likes", "desc"));
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
  },);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2 flex items-center justify-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Leaderboard
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Who got the most laughs?
      </p>

      <LeaderboardTable
        jokes={jokes}
      />
    </div>
  );
}
