"use client";

import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateLikes } from "@/api/post/patchPost";

type Props = {
  postId: string;
  postLikes: string[]; // mảng username
};

export default function LikeButton({ postId, postLikes }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [likes, setLikes] = useState(postLikes || []);
  const [isLoading, setIsLoading] = useState(false);

  const username = user?.username ?? "";
  const likedByCurrentUser = username && likes.includes(username);

  const toggleLike = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const result = await updateLikes({ postId, username });

      // Cập nhật trạng thái UI dựa vào hành động
      if (result && result.success) {
        setLikes((prevLikes) =>
          likedByCurrentUser
            ? prevLikes.filter((name) => name !== username)
            : [...prevLikes, username]
        );
      }
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <button
        onClick={toggleLike}
        disabled={isLoading}
        className={`flex items-center gap-2 text-sm font-semibold ${
          likedByCurrentUser ? "text-red-600" : "text-gray-600"
        } hover:text-red-500 transition`}
      >
        {likedByCurrentUser ? <FaHeart /> : <FaRegHeart />}
        {likedByCurrentUser ? "Đã thích" : "Thích"} ({likes.length})
      </button>

      {likes.length > 0 && (
        <div className="text-sm text-gray-500">
          Được thích bởi:{" "}
          {likes.slice(0, 3).map((name, i) => (
            <span key={i}>
              {name}
              {i < Math.min(likes.length, 3) - 1 ? ", " : ""}
            </span>
          ))}
          {likes.length > 3 && ` và ${likes.length - 3} người khác`}
        </div>
      )}
    </div>
  );
}
