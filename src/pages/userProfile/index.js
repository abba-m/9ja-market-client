import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import UserProfileNav from "./userNav";

function UserProfile() {
  return (
    <Container maxW="container.lg" minH="80vh" display="flex" p="0">
      <UserProfileNav />
      <Box p={4}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default UserProfile;
