const handleLike = async ({ id, likes, likedBy = [], user, doc, db, updateDoc, setJokes }) => {
    console.log(user);
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
export { handleLike };