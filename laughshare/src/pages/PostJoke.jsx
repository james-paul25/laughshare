import React from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import PostForm from "../forms/PostForm";

export default function PostJoke() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <PostForm
        user={user}
        navigate={navigate}
      />
    </>
  );
}
