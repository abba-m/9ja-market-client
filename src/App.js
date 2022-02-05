import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Dashboard from "pages/dashboardPage";
import TestPage from "pages/testPage/testPage";

//Nav Bar
import NavBar from "components/appNavBar/appNavBar";

//user profile views
import UserProfile from "pages/userProfile";
import FavoritesView from "pages/userProfile/views/favorites";
import NotificationsVeiw from "pages/userProfile/views/notifications";
import OrdersView from "pages/userProfile/views/orders";
import PostsView from "pages/userProfile/views/posts";
import ProfileView from "pages/userProfile/views/profile";
import ReviewsView from "pages/userProfile/views/reviews";
import SettingsView from "pages/userProfile/views/settings";
import NotFound from "components/404notFound";
import PostAd from "pages/postAd/postAd";

function App() {
  return (
    <Router>
      <Box className="App">
        <Box w="100%">
          <NavBar />
        </Box>
        <Box>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-post" element={<PostAd />} />
            <Route path="/profile" element={<UserProfile />}>
              <Route index element={<ProfileView />} />
              <Route path="favorites" element={<FavoritesView />} />
              <Route path="notifications" element={<NotificationsVeiw />} />
              <Route path="orders" element={<OrdersView />} />
              <Route path="posts" element={<PostsView />} />
              <Route path="reviews" element={<ReviewsView />} />
              <Route path="settings" element={<SettingsView />} />
            </Route>
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
