import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import { Box } from "@mui/system";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/users";

import ErrorAlert from "../ErrorAlert";

import { loginUser } from "../../helpers/authHelper";

import Copyright from "../Copyright";

const LoginView = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = await login(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <Paper
        elevation={6}
        sx={{
          width: "100%",
          p: 5,
          borderRadius: "24px",
          background: "#1e1e1e",
        }}
      >

        <Stack alignItems="center">

          {/* Logo */}
          <Typography
            variant="h3"
            fontWeight={700}
            color="primary"
            sx={{ mb: 2 }}
          >
            ConnectSpace
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            gutterBottom
            fontWeight={600}
          >
            Welcome Back 👋
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Login to continue connecting with friends
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            width="100%"
          >

            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              required
              id="email"
              name="email"
              onChange={handleChange}
            />

            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
            />

            <ErrorAlert error={serverError} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
              }}
            >
              Login
            </Button>

          </Box>

          {/* Signup Link */}
          <Typography color="text.secondary">

            Don’t have an account?{" "}

            <Link
              to="/signup"
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>

          </Typography>

          {/* Footer */}
          <Box sx={{ mt: 4 }}>
            <Copyright />
          </Box>

        </Stack>

      </Paper>

    </Container>
  );
};

export default LoginView;