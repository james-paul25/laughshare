import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const handleSubmit = async (e, { category, content, setContent, user, navigate }) => {
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

export { handleSubmit };