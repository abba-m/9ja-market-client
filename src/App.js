import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import ResetPassword from "pages/resetPassword/resetPassword"
import NewPassword from "pages/resetPassword/newPassword";

/** Actions */
import { userLoaded } from "store/actions";
/** Queries */
import { sendRequest } from "utils/connection";
import { stringify } from "qs";
import GoogleAuthRedirect from "components/auth/googleAuthRedirect";
import SingleAdPage from "pages/singleAdPage/singleAdPage";

function App() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem('token');
  const populateQuery = stringify({
    populate: "*",
  }, {
    encodeValuesOnly: true,
  });

  const getLoggedInUser = async () => {
    setIsLoading(true);
    const [res, error] = await sendRequest(fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/me?${populateQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }));

    if (error) {
      console.log(error)
      return toast({
        position: "top",
        title: "Something is wrong! Please try again.",
        status: "error",
        isClosable: true,
      });
    }

    const data = await res.json()

    if (data && data?.error) {
      console.log(data.error)
      //TODO: find a better approach
      // return toast({
      //   position: "top",
      //   title: `You are not logged in. Sign in or create account to enjoy 9jaMarket`,
      //   status: "info",
      //   isClosable: true,
      // });
    }

    if (data) {
      dispatch(userLoaded(data));
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getLoggedInUser();
  }, [])

  useEffect(() => {
    if (isLoading) {
      return <Spinner />
    }
  }, [isLoading])


  return (
    <Router>
      <Box className="App">
        <Box w="100%">
          <NavBar />
        </Box>
        <Box>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/post/:id/:title" element={<SingleAdPage />} />
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
            <Route path="/connect/google/callback" element={<GoogleAuthRedirect />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Router>

  );
}

export default App;
