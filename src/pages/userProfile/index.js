import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import UserProfileNav from "./userNav";

function UserProfile() {
  return (
    <Container
      maxWidth={["100%", "80vw"]}
      h="calc(100vh - 80px)"
      justifyContent="center">
      <UserProfileNav />
      <Box p={4}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default UserProfile;
