import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { useEffect } from "react";

import theme from "./theme";

import ExploreView from "./components/views/ExploreView";
import PostView from "./components/views/PostView";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";

import PrivateRoute from "./components/PrivateRoute";

import { initiateSocketConnection } from "./helpers/socketHelper";

function App() {

  useEffect(() => {
    initiateSocketConnection();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>

        <CssBaseline />

        <Routes>

          {/* Home Feed */}
          <Route path="/" element={<ExploreView />} />

          {/* Single Post */}
          <Route path="/posts/:id" element={<PostView />} />

          {/* Create Post */}
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostView />
              </PrivateRoute>
            }
          />

          {/* User Profile */}
          <Route path="/users/:id" element={<ProfileView />} />

          {/* Search */}
          <Route path="/search" element={<SearchView />} />

          {/* Messenger */}
          <Route
            path="/messenger"
            element={
              <PrivateRoute>
                <MessengerView />
              </PrivateRoute>
            }
          />

          {/* Authentication */}
          <Route path="/login" element={<LoginView />} />

          <Route path="/signup" element={<SignupView />} />

        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;