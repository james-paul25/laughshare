import React from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { handleLike } from "../services/likeService";

const JokeContainer = ({ user, filteredJokes, doc, db, updateDoc, setJokes }) => {

    return (
        <>
            {filteredJokes.length === 0 ? (
                <p className="text-center text-gray-500">No posts yet.</p>
            ) : (
                <div className="max-w-2xl mx-auto px-4">
                    {filteredJokes.map((joke) => {
                        const isLiked = user && joke.likedBy?.includes(user.uid);

                        return (
                            <div
                                key={joke.id}
                                className="bg-gray-100 p-4 mb-4 rounded shadow"
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
                                            ? handleLike({
                                                id: joke.id,
                                                likes: joke.likes || 0,
                                                likedBy: joke.likedBy || [],
                                                user,
                                                doc,
                                                db,
                                                updateDoc,
                                                setJokes
                                            })
                                            : alert("Please login to like jokes.")
                                    }
                                    className={`flex items-center gap-1 mt-2 px-3 py-1 rounded-full transition-all duration-150 ease-in-out shadow-sm cursor-pointer
                    ${user
                                            ? isLiked
                                                ? "hover:bg-blue-200 bg-blue-100 text-blue-600"
                                                : "hover:bg-gray-200 text-gray-600"
                                            : "text-gray-400 cursor-not-allowed"
                                        }
                  `}
                                >
                                    <HandThumbUpIcon
                                        className={`w-5 h-5 transition-transform duration-200 ${isLiked
                                            ? "text-blue-600 scale-110"
                                            : "text-gray-500 group-hover:scale-105"
                                            }`}
                                    />
                                    <span
                                        className={`text-sm font-medium ${isLiked ? "font-semibold text-blue-600" : "text-gray-700"
                                            }`}
                                    >
                                        {isLiked ? "Liked" : "Like"} ({joke.likes || 0})
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default JokeContainer;