import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

/** Actions */
import { userLoaded, authError } from "store/actions";
/** Queries */
import GoogleAuthRedirect from "components/auth/googleAuthRedirect";
import SingleAdPage from "pages/singleAdPage/singleAdPage";
import { getRequest } from "services/request";
import { useQuery } from "@tanstack/react-query";

function App() {
  const dispatch = useDispatch();

  const getCurrentUser = () => getRequest("api/users/me");
  const { isLoading, error, data } = useQuery(["GET_CURRENT_USER"], getCurrentUser);

  useEffect(() => {
    if (error) {
      console.log("[AUTH_ERROR]:", error);
      dispatch(authError(error));
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      dispatch(userLoaded(data?.data));
    }
  }, [data]);


  if (isLoading) {
    return <Spinner />;
  }


  return (
    <Router>
      <Box className="App">
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
              <Route path="notifications" element={<NotificationsVeiw />} />
              <Route path="orders" element={<OrdersView />} />
              <Route path="posts" element={<PostsView />} />
              <Route path="reviews" element={<ReviewsView />} />
              <Route path="notifications" element={<SettingsView />} />
            </Route>
            <Route
              path="/connect/google/callback"
              element={<GoogleAuthRedirect />}
            />
            <Route path="/test" element={<TestPage />} />
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
