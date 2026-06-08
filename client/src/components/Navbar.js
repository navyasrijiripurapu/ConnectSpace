import { useTheme } from "@emotion/react";

import {
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";

import {
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";

import { BsPeopleFill } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

import { isLoggedIn, logoutUser } from "../helpers/authHelper";

import UserAvatar from "./UserAvatar";

import HorizontalStack from "./util/HorizontalStack";

const Navbar = () => {

  const navigate = useNavigate();

  const user = isLoggedIn();

  const theme = useTheme();

  const username = user && isLoggedIn().username;

  const [search, setSearch] = useState("");

  const [searchIcon, setSearchIcon] = useState(false);

  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () =>
      window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;

  const navbarWidth = width < 700;

  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = () => {
    setSearchIcon(!searchIcon);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "18px",
        background: "#1e1e1e",
        mb: 3,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >

        {/* Logo */}
        <HorizontalStack>

          <BsPeopleFill
            size={30}
            color={theme.palette.primary.main}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Typography
            variant={navbarWidth ? "h6" : "h4"}
            fontWeight={700}
            color="primary"
            sx={{
              display: mobile ? "none" : "block",
            }}
          >
            ConnectSpace
          </Typography>

        </HorizontalStack>

        {/* Search */}
        {!navbarWidth && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              size="small"
              placeholder="Search posts..."
              onChange={handleChange}
              value={search}
              sx={{
                width: 280,
                background: "#2a2a2a",
                borderRadius: "12px",
              }}
            />
          </Box>
        )}

        {/* Right Side */}
        <HorizontalStack>

          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch color="white" />
            </IconButton>
          )}

          <IconButton component={Link} to={"/"}>
            <AiFillHome color="white" />
          </IconButton>

          {user ? (
            <>
              <IconButton component={Link} to={"/messenger"}>
                <AiFillMessage color="white" />
              </IconButton>

              <IconButton
                component={Link}
                to={"/users/" + username}
              >
                <UserAvatar
                  width={35}
                  height={35}
                  username={user.username}
                />
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                href="/signup"
              >
                Sign Up
              </Button>

              <Button
                variant="contained"
                color="primary"
                href="/login"
              >
                Login
              </Button>
            </>
          )}

        </HorizontalStack>
      </Stack>

      {/* Mobile Search */}
      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="small"
            placeholder="Search posts..."
            fullWidth
            onChange={handleChange}
            value={search}
            sx={{
              background: "#2a2a2a",
              borderRadius: "12px",
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default Navbar;