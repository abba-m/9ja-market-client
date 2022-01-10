import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "pages/dashboardPage";
import TestPage from "pages/testPage";

//Nav Bar
import NavBar from "components/appNavBar";

//user profile views
import UserProfile from "pages/userProfile";
import FavoritesView from "pages/userProfile/views/favorites";
import NotificationsVeiw from "pages/userProfile/views/notifications";
import OrdersView from "pages/userProfile/views/orders";
import PostsView from "pages/userProfile/views/posts";
import ProfileView from "pages/userProfile/views/profile";
import ReviewsView from "pages/userProfile/views/reviews";
import SettingsView from "pages/userProfile/views/settings";
import { Box } from "@chakra-ui/react";
import NotFound from "components/404notFound";

function App() {
  return (
    <div className="App">
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
        </Router>
      </Box>
    </div>
  );
}

export default App;
