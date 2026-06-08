import { Stack, Paper, Typography } from "@mui/material";

import React from "react";

import FindUsers from "./FindUsers";

import Footer from "./Footer";

import TopPosts from "./TopPosts";

const Sidebar = () => {

  return (
    <Stack spacing={3}>

      {/* Trending Section */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "20px",
          background: "#1e1e1e",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
          color="primary"
        >
          Trending Posts 🔥
        </Typography>

        <TopPosts />
      </Paper>

      {/* Suggested Users */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "20px",
          background: "#1e1e1e",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
          color="primary"
        >
          Suggested Users 👥
        </Typography>

        <FindUsers />
      </Paper>

      {/* Footer */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "20px",
          background: "#1e1e1e",
        }}
      >
        <Footer />
      </Paper>

    </Stack>
  );
};

export default Sidebar;