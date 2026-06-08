import {
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { getUser, updateUser } from "../../api/users";

import { isLoggedIn } from "../../helpers/authHelper";

import CommentBrowser from "../CommentBrowser";

import ErrorAlert from "../ErrorAlert";

import FindUsers from "../FindUsers";

import Footer from "../Footer";

import GridLayout from "../GridLayout";

import Loading from "../Loading";

import MobileProfile from "../MobileProfile";

import Navbar from "../Navbar";

import PostBrowser from "../PostBrowser";

import Profile from "../Profile";

import ProfileTabs from "../ProfileTabs";

const ProfileView = () => {

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);

  const [editing, setEditing] = useState(false);

  const [tab, setTab] = useState("posts");

  const [error, setError] = useState("");

  const user = isLoggedIn();

  const params = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const fetchUser = async () => {

    setLoading(true);

    const data = await getUser(params);

    setLoading(false);

    if (data.error) {

      setError(data.error);

    } else {

      setProfile(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const content = e.target.content.value;

    await updateUser(user, {
      biography: content,
    });

    setProfile({
      ...profile,
      user: {
        ...profile.user,
        biography: content,
      },
    });

    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = () => {
    navigate("/messenger", {
      state: { user: profile.user },
    });
  };

  const validate = (content) => {

    let error = "";

    if (content.length > 250) {
      error =
        "Bio cannot be longer than 250 characters";
    }

    return error;
  };

  let tabs;

  if (profile) {

    tabs = {

      posts: (
        <PostBrowser
          profileUser={profile.user}
          contentType="posts"
          key="posts"
        />
      ),

      liked: (
        <PostBrowser
          profileUser={profile.user}
          contentType="liked"
          key="liked"
        />
      ),

      comments: (
        <CommentBrowser
          profileUser={profile.user}
        />
      ),
    };
  }

  return (
    <Container maxWidth="lg">

      {/* Navbar */}
      <Navbar />

      {/* Profile Header */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
          color: "white",
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          User Profile 👤
        </Typography>

        <Typography mt={1}>
          View posts, liked content and connect
          with people.
        </Typography>

      </Paper>

      {/* Main Layout */}
      <GridLayout

        left={
          <>

            {/* Mobile Profile */}
            <MobileProfile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
            />

            <Stack spacing={3}>

              {profile ? (
                <>

                  {/* Tabs */}
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: "20px",
                      background: "#1e1e1e",
                    }}
                  >
                    <ProfileTabs
                      tab={tab}
                      setTab={setTab}
                    />
                  </Paper>

                  {/* Tab Content */}
                  {tabs[tab]}

                </>
              ) : (
                <Loading />
              )}

              {error && (
                <ErrorAlert error={error} />
              )}

            </Stack>
          </>
        }

        right={
          <Stack spacing={3}>

            {/* Desktop Profile */}
            <Profile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
            />

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
                color="primary"
                mb={2}
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
        }

      />
    </Container>
  );
};

export default ProfileView;