import {
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import React from "react";

import GridLayout from "../GridLayout";

import Navbar from "../Navbar";

import PostEditor from "../PostEditor";

import Sidebar from "../Sidebar";

import GoBack from "../GoBack";

const CreatePostView = () => {

  return (
    <Container maxWidth="lg">

      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <GoBack />

      {/* Header */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mt: 2,
          mb: 3,
          borderRadius: "24px",
          background:
            "linear-gradient(135deg,  0%, #9333ea 100%)",
          color: "white",
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Create New Post ✨
        </Typography>

        <Typography mt={1}>
          Share your thoughts, ideas and moments with the community.
        </Typography>

      </Paper>

      {/* Main Layout */}
      <GridLayout

        left={
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "#1e1e1e",
            }}
          >
            <PostEditor />
          </Paper>
        }

        right={<Sidebar />}

      />

    </Container>
  );
};

export default CreatePostView;