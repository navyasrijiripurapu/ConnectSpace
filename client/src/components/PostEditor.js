import {
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import { Box } from "@mui/system";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createPost } from "../api/posts";

import ErrorAlert from "./ErrorAlert";

import { isLoggedIn } from "../helpers/authHelper";

import HorizontalStack from "./util/HorizontalStack";

import UserAvatar from "./UserAvatar";

const PostEditor = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");

  const [errors, setErrors] = useState({});

  const user = isLoggedIn();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    const errors = validate();

    setErrors(errors);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const data = await createPost(
      formData,
      isLoggedIn()
    );

    setLoading(false);

    if (data && data.error) {

      setServerError(data.error);

    } else {

      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {

    const errors = {};

    if (formData.title.length > 100) {
      errors.title =
        "Title should be under 100 characters";
    }

    if (formData.content.length > 1000) {
      errors.content =
        "Content should be under 1000 characters";
    }

    return errors;
  };

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: "24px",
        background: "#1e1e1e",
        boxShadow:
          "0 6px 18px rgba(0,0,0,0.3)",
      }}
    >

      <Stack spacing={3}>

        {/* User Info */}
        {user && (

          <HorizontalStack spacing={2}>

            <UserAvatar
              width={55}
              height={55}
              username={user.username}
            />

            <Box>

              <Typography
                variant="h6"
                fontWeight={700}
              >
                {user.username}
              </Typography>

              <Typography
                color="text.secondary"
              >
                Share your thoughts with everyone ✨
              </Typography>

            </Box>

          </HorizontalStack>

        )}

        {/* Markdown Help */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "16px",
            background: "#2a2a2a",
          }}
        >

          <Typography
            variant="body2"
            color="text.secondary"
          >
            You can use markdown formatting for
            better post styling.
          </Typography>

          <a
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Learn Markdown
          </a>

        </Paper>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
        >

          {/* Title */}
          <TextField
            fullWidth
            label="Post Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
            sx={{
              mb: 2,
            }}
          />

          {/* Content */}
          <TextField
            fullWidth
            label="What's on your mind?"
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={
              errors.content ||
              `${formData.content.length}/1000`
            }
            required
            sx={{
              mb: 2,
            }}
          />

          {/* Error */}
          <ErrorAlert error={serverError} />

          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "14px",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",

              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {loading
              ? "Publishing..."
              : "Publish Post 🚀"}
          </Button>

        </Box>

      </Stack>

    </Card>
  );
};

export default PostEditor;