// components/Comment.tsx
"use client";
import React, { useState } from "react";
import axiosInstance from "@/untils/axios";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from "../../../context/UserContext";

interface CommentSchema {
  _id: string;
  postId: string;
  parentId?: string | null;
  authorId: string;
  authorName: string;
  content: string;
  date: string;
  replies?: CommentSchema[];
}

interface CommentProps {
  comment: CommentSchema;
  fetchComments: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, fetchComments }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);

  // Giả sử user được lưu trong redux
  const { user } = useUser();

  const handleReplySubmit = async () => {
    if (replyText.trim() && user) {
      try {
        await axiosInstance.post(`/api/comment/${comment.postId}`, {
          authorId: user?._id,
          authorName: user?.username,
          content: replyText,
          parentId: comment._id, // Gắn làm trả lời của comment cha
        });
        setReplyText("");
        setShowReply(false);
        fetchComments();
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };

  const handleEditComment = async () => {
    if (editedText.trim() && comment._id) {
      try {
        await axiosInstance.put(`/api/comment/${comment._id}`, {
          content: editedText,
        });
        setEditing(false);
        fetchComments();
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const handleDeleteComment = async () => {
    if (comment._id) {
      try {
        await axiosInstance.delete(`/api/comment/${comment._id}`);
        fetchComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 2,
        width: "100%",
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar>{comment.authorName[0]}</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            {comment.authorName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {format(new Date(comment.date), "dd/MM/yyyy")}
          </Typography>
        </Box>
        {user && (user?._id === comment.authorId || user?.role === "admin") && (
          <Box sx={{ ml: "auto" }}>
            <IconButton size="small" onClick={() => setEditing(!editing)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleDeleteComment}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {editing ? (
        <Box sx={{ ml: 7 }}>
          <TextField
            fullWidth
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            multiline
            rows={2}
            variant="outlined"
          />
          <Button size="small" onClick={handleEditComment}>
            Lưu
          </Button>
          <Button size="small" onClick={() => setEditing(false)}>
            Hủy
          </Button>
        </Box>
      ) : (
        <Typography sx={{ ml: 7, mb: 1 }}>{comment.content}</Typography>
      )}

      {user && (
        <Box sx={{ ml: 7 }}>
          <Button size="small" onClick={() => setShowReply(!showReply)}>
            {showReply ? "Hủy" : "Trả lời"}
          </Button>
        </Box>
      )}

      {showReply && (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 7, mt: 1 }}>
          <TextField
            label="Viết trả lời..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            multiline
            rows={2}
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <Button variant="contained" size="small" onClick={handleReplySubmit}>
            Gửi
          </Button>
        </Box>
      )}

      {/* Hiển thị các bình luận trả lời (nếu có) */}
      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ pl: 7, mt: 1 }}>
          {comment.replies.map((reply) => (
            <Box key={reply._id} sx={{ mb: 1 }}>
              <Comment comment={reply} fetchComments={fetchComments} />
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Comment;
