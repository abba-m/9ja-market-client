import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Spinner, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "pages/dashboardPage/dashboard";
import TestPage from "pages/testPage/testPage";
/** Nav Bar */
import NavBar from "components/appNavBar/appNavBar";
/** User profile views */
import UserProfile from "pages/userProfile/userProfile";
import FavoritesView from "pages/userProfile/views/favorites";
import NotificationsVeiw from "pages/userProfile/views/notifications";
import OrdersView from "pages/userProfile/views/orders";
import PostsView from "pages/userProfile/views/posts";
import ProfileView from "pages/userProfile/views/profile";
import ReviewsView from "pages/userProfile/views/reviews";
import SettingsView from "pages/userProfile/views/settings";
import NotFound from "components/404notFound";
import PostAd from "pages/postAd/postAd";
import ResetPassword from "pages/resetPasswordPage/resetPassword";
import UpdatePassword from "pages/resetPasswordPage/updatePassword";
import ProfilePage from "pages/ProfilePage";
import Footer from "components/footer/footer";

/** Actions */
import { userLoaded, authError } from "store/actions";
/** Queries */
import GoogleAuthRedirect from "components/auth/googleAuthRedirect";
import SingleAdPage from "pages/singleAdPage/singleAdPage";
import { getRequest } from "services/request";
import ChatPage from "pages/chatPage/chatPage";
import { SocketClient } from "services/socket";
import ChatMainArea from "pages/chatPage/chatMainArea";
import BgImage from "pages/chatPage/backgroundImg";
import Address from "pages/userProfile/views/addresses";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const getCurrentUser = () => {
    if (isLoading) return;

    getRequest("api/users/me")
      .then((data) => dispatch(userLoaded(data?.data)))
      .catch((err) => {
        dispatch(authError());
        console.log("[AUTH_ERROR]:", err);
      });
  };

  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    SocketClient.init().emit("user:connect");
  }, []);

  if (isLoading) {
    return (
      <Box
        h="100vh"
        w="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner color="primary" thickness="5px" size="xl" />
      </Box>
    );
  }

  return (
    <Router>
      <Box
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        marginInline="auto"
        maxW="1800px"
        className="App"
      >
        <Box w="100%">
          <NavBar />
        </Box>
        <Box>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/post/:slug" element={<SingleAdPage />} />
            <Route path="/new-post" element={<PostAd />} />
            <Route path="/profile" element={<UserProfile />}>
              <Route index element={<ProfileView />} />
              <Route path="favorites" element={<FavoritesView />} />
              <Route path="addresses" element={<Address />} />
              <Route path="notifications" element={<NotificationsVeiw />} />
              <Route path="orders" element={<OrdersView />} />
              <Route path="posts" element={<PostsView />} />
              <Route path="reviews" element={<ReviewsView />} />
              <Route path="settings" element={<SettingsView />} />
            </Route>
            <Route
              path="/connect/google/callback"
              element={<GoogleAuthRedirect />}
            />
            <Route path="/test" element={<TestPage />} />
            <Route path="/profilePage/:userId" element={<ProfilePage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="*" element={<NotFound />} />
            {isLargeScreen ? (
              <Route path="/chats" element={<ChatPage />}>
                <Route index element={<BgImage />} />
                <Route path="message/:userId" element={<ChatMainArea />} />
              </Route>
            ) : (
              <>
                <Route path="/chats" element={<ChatPage />} />
                <Route
                  path="/chats/message/:userId"
                  element={<ChatMainArea />}
                />
              </>
            )}
          </Routes>
          <Box w="100%">{/* <Footer /> */}</Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
