import { useTheme } from "@emotion/react";

import {
  Avatar,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  Paper,
} from "@mui/material";

import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";

import {
  AiFillEdit,
  AiFillHeart,
} from "react-icons/ai";

import { BsPostcardFill } from "react-icons/bs";

import { isLoggedIn } from "../helpers/authHelper";

import ContentUpdateEditor from "./ContentUpdateEditor";

import Loading from "./Loading";

import UserAvatar from "./UserAvatar";

import HorizontalStack from "./util/HorizontalStack";

const Profile = (props) => {

  const [user, setUser] = useState(null);

  const currentUser = isLoggedIn();

  const theme = useTheme();

  const iconColor = theme.palette.primary.main;

  useEffect(() => {

    if (props.profile) {
      setUser(props.profile.user);
    }

  }, [props.profile]);

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: "24px",
        background: "#1e1e1e",
        boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
      }}
    >

      {user ? (

        <Stack alignItems="center" spacing={3}>

          {/* Profile Image */}
          <Box
            sx={{
              position: "relative",
            }}
          >

            <UserAvatar
              width={140}
              height={140}
              username={user.username}
            />

          </Box>

          {/* Username */}
          <Typography
            variant="h5"
            fontWeight={700}
          >
            @{user.username}
          </Typography>

          {/* Bio */}
          {props.editing ? (

            <Box width="100%">

              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />

            </Box>

          ) : user.biography ? (

            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "16px",
                background: "#2a2a2a",
                width: "100%",
                textAlign: "center",
              }}
            >

              <Typography
                color="text.secondary"
                lineHeight={1.8}
              >
                {user.biography}
              </Typography>

            </Paper>

          ) : (

            <Typography
              color="text.secondary"
              fontStyle="italic"
            >
              No bio added yet
            </Typography>

          )}

          {/* Buttons */}
          {currentUser &&
            user._id === currentUser.userId && (

              <Button
                variant="contained"
                startIcon={
                  <AiFillEdit color="white" />
                }
                onClick={props.handleEditing}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                }}
              >
                {props.editing
                  ? "Cancel"
                  : "Edit Bio"}
              </Button>
            )}

          {currentUser &&
            user._id !== currentUser.userId && (

              <Button
                variant="outlined"
                onClick={props.handleMessage}
                sx={{
                  borderRadius: "12px",
                  px: 4,
                }}
              >
                Message
              </Button>
            )}

          <Divider
            sx={{
              width: "100%",
              borderColor: "#333",
            }}
          />

          {/* Stats */}
          <HorizontalStack
            spacing={5}
            justifyContent="center"
          >

            <Stack alignItems="center">

              <AiFillHeart
                size={24}
                color={theme.palette.primary.main}
              />

              <Typography
                fontWeight={700}
                mt={1}
              >
                {props.profile.posts.likeCount}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Likes
              </Typography>

            </Stack>

            <Stack alignItems="center">

              <BsPostcardFill
                size={22}
                color={theme.palette.primary.main}
              />

              <Typography
                fontWeight={700}
                mt={1}
              >
                {props.profile.posts.count}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Posts
              </Typography>

            </Stack>

          </HorizontalStack>

        </Stack>

      ) : (

        <Loading label="Loading Profile..." />

      )}
    </Card>
  );
};

export default Profile;