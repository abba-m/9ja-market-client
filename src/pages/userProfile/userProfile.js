import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import UserProfileNav from "./navBar.userProfile";

function UserProfile() {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    navigate("/", {
      state: {
        openLogin: true,
      }
    });
  }
  return (
    <Container
      maxWidth={["100%", "90vw"]}
      h="calc(100vh - 80px)"
      display="flex"
      justifyContent="flex-start">
      <UserProfileNav />
      <Box p={4}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default UserProfile;
