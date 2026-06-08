import {
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Avatar,
  Divider,
} from "@mui/material";

import { Box } from "@mui/system";

import React, { useState } from "react";

import {
  AiFillCheckCircle,
  AiFillEdit,
  AiFillHeart,
  AiFillMessage,
} from "react-icons/ai";

import { BiTrash } from "react-icons/bi";

import { MdCancel } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import {
  deletePost,
  likePost,
  unlikePost,
  updatePost,
} from "../api/posts";

import { isLoggedIn } from "../helpers/authHelper";

import ContentDetails from "./ContentDetails";

import PostContentBox from "./PostContentBox";

import HorizontalStack from "./util/HorizontalStack";

import ContentUpdateEditor from "./ContentUpdateEditor";

import Markdown from "./Markdown";

import UserLikePreview from "./UserLikePreview";

import "./postCard.css";

const PostCard = (props) => {

  const { preview, removePost } = props;

  let postData = props.post;

  const navigate = useNavigate();

  const user = isLoggedIn();

  const isAuthor =
    user && user.username === postData.poster.username;

  const theme = useTheme();

  const iconColor = theme.palette.primary.main;

  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [post, setPost] = useState(postData);

  const [likeCount, setLikeCount] = useState(post.likeCount);

  let maxHeight = null;

  if (preview === "primary") {
    maxHeight = 250;
  }

  const handleDeletePost = async (e) => {

    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {

      setLoading(true);

      await deletePost(post._id, isLoggedIn());

      setLoading(false);

      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = (e) => {
    e.stopPropagation();
    setEditing(!editing);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const content = e.target.content.value;

    await updatePost(post._id, isLoggedIn(), { content });

    setPost({
      ...post,
      content,
      edited: true,
    });

    setEditing(false);
  };

  const handleLike = async (liked) => {
  try {
    if (liked) {
      setLikeCount((prev) => prev + 1);

      setPost({
        ...post,
        liked: true,
      });

      await likePost(post._id, user);
    } else {
      setLikeCount((prev) => prev - 1);

      setPost({
        ...post,
        liked: false,
      });

      await unlikePost(post._id, user);
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Card
      sx={{
        padding: 3,
        borderRadius: "22px",
        background: "#1e1e1e",
        boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
        border: "1px solid #2a2a2a",
        mb: 3,
      }}
      className="post-card"
    >

      {/* Header */}
      <HorizontalStack justifyContent="space-between">

        <HorizontalStack spacing={2}>

          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {post.poster.username[0].toUpperCase()}
          </Avatar>

          <Box>

            <Typography
              fontWeight={700}
              variant="subtitle1"
            >
              {post.poster.username}
            </Typography>

            <ContentDetails
              username={post.poster.username}
              createdAt={post.createdAt}
              edited={post.edited}
              preview={preview === "secondary"}
            />

          </Box>

        </HorizontalStack>

        {/* Actions */}
        {user &&
          (isAuthor || user.isAdmin) &&
          preview !== "secondary" && (
            <HorizontalStack>

              <IconButton
                disabled={loading}
                size="small"
                onClick={handleEditPost}
              >
                {editing ? (
                  <MdCancel color={iconColor} />
                ) : (
                  <AiFillEdit color={iconColor} />
                )}
              </IconButton>

              <IconButton
                disabled={loading}
                size="small"
                onClick={handleDeletePost}
              >
                {confirm ? (
                  <AiFillCheckCircle
                    color={theme.palette.error.main}
                  />
                ) : (
                  <BiTrash
                    color={theme.palette.error.main}
                  />
                )}
              </IconButton>

            </HorizontalStack>
          )}

      </HorizontalStack>

      {/* Title */}
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mt: 2,
          mb: 1,
        }}
      >
        {post.title}
      </Typography>

      {/* Content */}
      {preview !== "secondary" &&
        (editing ? (
          <ContentUpdateEditor
            handleSubmit={handleSubmit}
            originalContent={post.content}
          />
        ) : (
          <Box
            maxHeight={maxHeight}
            overflow="hidden"
            sx={{
              color: "#d1d1d1",
              lineHeight: 1.8,
            }}
          >
            <Markdown content={post.content} />
          </Box>
        ))}

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
<HorizontalStack justifyContent="space-between">

  <HorizontalStack spacing={3}>

    <HorizontalStack spacing={1}>

      <IconButton
        onClick={() => {
          if (!user) {
            navigate("/login");
            return;
          }

          handleLike(!post.liked);
        }}
      >
        <AiFillHeart
          color={
            post.liked
              ? theme.palette.error.main
              : theme.palette.primary.main
          }
        />
      </IconButton>

      <Typography fontWeight={600}>
        {likeCount}
      </Typography>

    </HorizontalStack>

    <HorizontalStack spacing={1}>

      <IconButton
        onClick={() => navigate(`/posts/${post._id}`)}
      >
        <AiFillMessage color={theme.palette.primary.main} />
      </IconButton>

      <Typography fontWeight={600}>
        {post.commentCount || 0}
      </Typography>

    </HorizontalStack>

  </HorizontalStack>

  <UserLikePreview
    postId={post._id}
    userLikePreview={post.userLikePreview}
  />

</HorizontalStack>

</Card>
);
};

export default PostCard;