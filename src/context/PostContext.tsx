"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { Post } from "../types/Post";
import { getAllPosts } from "../api/post/apiGetPosts";

type PostContextType = {
  posts: Post[];
  isLoading: boolean;
  refreshPosts: () => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshPosts = useCallback(async () => {
    setIsLoading(true);
    const res = await getAllPosts(5);
    if (res?.success) {
      setPosts(res.data);
    }
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  return (
    <PostContext.Provider value={{ posts, isLoading, refreshPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
