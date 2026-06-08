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

import { signup } from "../../api/users";

import { loginUser } from "../../helpers/authHelper";

import { useNavigate, Link } from "react-router-dom";

import Copyright from "../Copyright";

import ErrorAlert from "../ErrorAlert";

import { isLength, isEmail, contains } from "validator";

const SignupView = () => {

  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {

    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username =
        "Username must be between 6 and 30 characters";
    }

    if (contains(formData.username, " ")) {
      errors.username =
        "Username should not contain spaces";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password =
        "Password must be at least 8 characters";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    setErrors(errors);

    return errors;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

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

          {/* Heading */}
          <Typography
            variant="h5"
            gutterBottom
            fontWeight={600}
          >
            Create Account 🚀
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Join ConnectSpace and connect with people
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            width="100%"
          >

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              autoFocus
              required
              id="username"
              name="username"
              onChange={handleChange}
              error={errors.username !== undefined}
              helperText={errors.username}
            />

            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              required
              id="email"
              name="email"
              onChange={handleChange}
              error={errors.email !== undefined}
              helperText={errors.email}
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
              error={errors.password !== undefined}
              helperText={errors.password}
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
              Create Account
            </Button>

          </Box>

          {/* Login Link */}
          <Typography color="text.secondary">

            Already have an account?{" "}

            <Link
              to="/login"
              style={{
                color: "#38bdf8",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
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

export default SignupView;