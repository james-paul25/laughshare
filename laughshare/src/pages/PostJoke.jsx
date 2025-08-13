import React from "react";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import PostForm from "../forms/PostForm";

export default function PostJoke() {
  const [category, setCategory] = useState("Funny");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();



  return (
    <>
      <PostForm
        user={user}
        category={category}
        setCategory={setCategory}
        content={content}
        setContent={setContent}
        navigate={navigate}
      />
    </>
  );
}
