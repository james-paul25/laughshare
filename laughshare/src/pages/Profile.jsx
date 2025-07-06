import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showMenuId, setShowMenuId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

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

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    await deleteDoc(doc(db, "jokes", deleteTargetId));
    setPosts(posts.filter((post) => post.id !== deleteTargetId));
    setShowDeleteModal(false);
    alert("Joke deleted successfully!");
    setDeleteTargetId(null);
  };

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
            <li key={post.id} className="bg-gray-100 p-4 rounded shadow relative">
              <div className="flex justify-between items-start mb-1">
                <p className="text-gray-800 font-semibold">
                  Category: {post.category}
                </p>
                {post.createdAt && (
                <p className="text-xs text-gray-500 text-right">
                  {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                </p>
                )}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowMenuId((prev) => (prev === post.id ? null : post.id))
                    }
                  >
                    <HiDotsHorizontal className="text-gray-500 hover:text-gray-700" />
                  </button>
                  {showMenuId === post.id && (
                    <div className="absolute right-0 mt-1 bg-white border rounded shadow-md text-sm z-10">
                      <button
                        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          alert("Edit functionality coming soon!");
                          setShowMenuId(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setDeleteTargetId(post.id);
                          setShowDeleteModal(true);
                          setShowMenuId(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              
              <p className="text-gray-800">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">Likes: {post.likes || 0}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven't posted any jokes yet.</p>
      )}
      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
