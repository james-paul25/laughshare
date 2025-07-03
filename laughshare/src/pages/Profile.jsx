import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      const q = query(collection(db, "jokes"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const jokes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(jokes);
    };

    fetchUserPosts();
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-600">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h3 className="text-xl font-semibold">{user.displayName}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3">My Posts</h3>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-gray-100 p-4 rounded shadow">
              <div className="flex justify-between items-start mb-1">
                <p className="text-gray-800 font-semibold">
                  Category: {post.category}
                </p>
                {post.createdAt && (
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                )}
              </div>
              <p className="text-gray-800">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Likes: {post.likes || 0}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven't posted any jokes yet.</p>
      )}
    </div>
  );
}
