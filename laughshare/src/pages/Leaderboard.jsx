import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase";
import { Trophy } from 'lucide-react';
import { HeartIcon } from '@heroicons/react/24/solid'

export default function Leaderboard() {
  const { user } = useAuth();
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
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
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2 flex items-center justify-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Leaderboard
      </h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Who got the most laughs?
      </p>

      {jokes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-yellow-200 text-left">
                <th className="p-3 border border-gray-300">Profile</th>
                <th className="p-3 border border-gray-300">Joke</th>
                <th className="p-3 border border-gray-300 text-center">Likes</th>
              </tr>
            </thead>
            <tbody>
              {jokes.map((joke) => (
                <tr key={joke.id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">
                    <div className="flex items-center gap-2">
                      <img
                        src={joke.photoURL || "/default-avatar.png"}
                        alt="User"
                        className="w-8 h-8 rounded-full border"
                      />
                      <span className="text-gray-700 text-sm">
                        {joke.username|| "Anonymous"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 text-gray-800">
                    {joke.content}
                  </td>
                 <td className="p-3 border border-gray-300 text-blue-600 text-center">
                <div className="flex items-center justify-center gap-1">
                    <HeartIcon className="w-4 h-4 text-red-500" />
                    {joke.likes || 0}
                </div>
                </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No jokes available yet.</p>
      )}
    </div>
  );
}
