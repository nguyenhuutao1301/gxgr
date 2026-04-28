// components/Blogs/CommentsSection/CommentsList.tsx
"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../untils/axios";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import Comment from "./CommentComponent"; // Đảm bảo đường dẫn đúng
import { useUser } from "../../../context/UserContext";
// Định nghĩa kiểu cho comment (nếu bạn có file types riêng)
export interface CommentSchema {
  _id: string;
  postId: string;
  parentId?: string | null;
  authorId: string;
  authorName: string;
  content: string;
  date: string;
  replies?: CommentSchema[];
}

interface CommentsListProps {
  postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentSchema[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useUser();

  const fetchComments = async () => {
    try {
      const { data } = await axiosInstance(`/api/comment/${postId}`);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleNewCommentSubmit = async () => {
    if (!newComment.trim() || !user) return;
    try {
      await axiosInstance.post(`/api/comment/${postId}`, {
        authorId: user?._id,
        authorName: user?.username,
        content: newComment,
        parentId: null, // Bình luận gốc, không có bình luận cha
      });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Bình luận
      </Typography>

      {/* Form nhập bình luận luôn hiển thị nếu người dùng đã đăng nhập */}
      {user ? (
        <Box mb={3}>
          <TextField
            label="Viết bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewCommentSubmit}
            sx={{ mt: 1 }}
          >
            Gửi bình luận
          </Button>
        </Box>
      ) : (
        <Typography mb={3} color="textSecondary">
          Vui lòng đăng nhập để bình luận.
        </Typography>
      )}

      {/* Nếu chưa có bình luận nào, hiển thị thông báo */}
      {comments.length === 0 ? (
        <Typography variant="body1">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </Typography>
      ) : (
        // Nếu có bình luận, hiển thị danh sách bình luận
        comments.map((comment) => (
          <React.Fragment key={comment._id}>
            <Comment comment={comment} fetchComments={fetchComments} />
            <Divider sx={{ my: 2 }} />
          </React.Fragment>
        ))
      )}
    </Box>
  );
};

export default CommentsList;
