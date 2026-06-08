import { Button } from "@mui/material";

import React from "react";

import { useNavigate } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";

const CreatePost = () => {

  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      size="large"
      startIcon={<AiOutlinePlus />}
      onClick={() => navigate("/posts/create")}
      sx={{

        borderRadius: "14px",

        px: 3,

        py: 1.2,

        fontWeight: 700,

        background:
          "linear-gradient(135deg, #38bdf8 0%, #0ea5e9",

        boxShadow:
          "0 6px 14px rgba(124,58,237,0.4)",

        transition: "0.3s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 8px 18px rgba(124,58,237,0.5)",
        },
      }}
    >
      Create Post
    </Button>
  );
};

export default CreatePost;