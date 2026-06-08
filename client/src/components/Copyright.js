import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright © 2026{" "}
      <Link to="/" color="inherit">
        ConnectSpace
      </Link>
    </Typography>
  );
};

export default Copyright;
