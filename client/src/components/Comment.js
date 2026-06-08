import { Button, IconButton, Typography, useTheme } from "@mui/material";
import { Box, compose } from "@mui/system";
import React, { useState } from "react";
import { AiFillEdit, AiOutlineLine, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";
import CommentEditor from "./CommentEditor";
import ContentDetails from "./ContentDetails";
import HorizontalStack from "./util/HorizontalStack";
import { deleteComment, updateComment } from "../api/posts";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";
import { MdCancel } from "react-icons/md";
import { BiReply, BiTrash } from "react-icons/bi";
import { BsReply, BsReplyFill } from "react-icons/bs";
import Moment from "react-moment";

const Comment = (props) => {
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const { depth, addComment, removeComment, editComment } = props;
  const commentData = props.comment;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(commentData);
  const user = isLoggedIn();
  const isAuthor = user && user.userId === comment.commenter._id;
  const navigate = useNavigate();

  const handleSetReplying = () => {
    if (isLoggedIn()) {
      setReplying(!replying);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateComment(comment._id, user, { content });

    const newCommentData = { ...comment, content, edited: true };

    setComment(newCommentData);

    editComment(newCommentData);

    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, user);
    removeComment(comment);
  };

  let style = {
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
  borderRadius: 3,
  mb: theme.spacing(2),
  padding: theme.spacing(0),
  border: "1px solid #2a2a2a",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

if (depth % 2 === 1) {
  style.backgroundColor = "#252525";
}

  return (
    <Box sx={style}>
      <Box
        sx={{
          pl: theme.spacing(2),
          pt: theme.spacing(1),
          pb: theme.spacing(1),
          pr: 1,
        }}
      >
        {props.profile ? (
          <Box>
            <Typography variant="h6">
              <Link underline="hover" to={"/posts/" + comment.post._id}>
                {comment.post.title}
              </Link>
            </Typography>
            <Typography
  variant="subtitle2"
  gutterBottom
  sx={{
    color: "#bdbdbd",
  }}
>
              <Moment fromNow>{comment.createdAt}</Moment>{" "}
              {comment.edited && <>(Edited)</>}
            </Typography>
          </Box>
        ) : (
          <HorizontalStack justifyContent="space-between">
            <HorizontalStack>
              <ContentDetails
                username={comment.commenter.username}
                createdAt={comment.createdAt}
                edited={comment.edited}
              />

              <IconButton
                color="primary"
                onClick={() => setMinimised(!minimised)}
              >
                {minimised ? (
                  <AiOutlinePlus size={15} />
                ) : (
                  <AiOutlineLine size={15} />
                )}
              </IconButton>
            </HorizontalStack>
            {!minimised && (
              <HorizontalStack spacing={1}>
                <IconButton
                  variant="text"
                  size="small"
                  onClick={handleSetReplying}
                >
                  {!replying ? (
                    <BsReplyFill color={iconColor} />
                  ) : (
                    <MdCancel color={iconColor} />
                  )}
                </IconButton>
                {user && (isAuthor || user.isAdmin) && (
                  <HorizontalStack spacing={1}>
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={() => setEditing(!editing)}
                    >
                      {editing ? (
                        <MdCancel color={iconColor} />
                      ) : (
                        <AiFillEdit color={iconColor} />
                      )}
                    </IconButton>
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={handleDelete}
                    >
                      <BiTrash color={theme.palette.error.main} />
                    </IconButton>
                  </HorizontalStack>
                )}
              </HorizontalStack>
            )}
          </HorizontalStack>
        )}

        {!minimised && (
          <Box sx={{ mt: 1 }} overflow="hidden">
            {!editing ? (
              <Box
  sx={{
    color: "#ffffff",
    "& p": {
      color: "#ffffff",
    },
  }}
>
  <Markdown content={comment.content} />
</Box>
            ) : (
              <ContentUpdateEditor
                handleSubmit={handleSubmit}
                originalContent={comment.content}
              />
            )}

            {replying && !minimised && (
              <Box sx={{ mt: 2 }}>
                <CommentEditor
                  comment={comment}
                  addComment={addComment}
                  setReplying={setReplying}
                  label="What are your thoughts on this comment?"
                />
              </Box>
            )}
            {comment.children && (
              <Box sx={{ pt: theme.spacing(2) }}>
                {comment.children.map((reply, i) => (
                  <Comment
                    key={reply._id}
                    comment={reply}
                    depth={depth + 1}
                    addComment={addComment}
                    removeComment={removeComment}
                    editComment={editComment}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
