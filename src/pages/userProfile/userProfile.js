import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UserProfileNav from "./navBar.userProfile";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function UserProfile() {
  const navigate = useNavigate();
  const [navToggle, setNavToggle] = useState(false);

  if (!localStorage.getItem("token")) {
    navigate("/", {
      state: {
        openLogin: true,
      },
    });
  }
  const { pathname } = useLocation();

  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  return (
    <Container
      maxWidth={["100%", "100vw"]}
      marginLeft="-0.7rem"
      h="calc(100vh - 100px)"
      display="flex"
      justifyContent="flex-start"
      alignItems="start"
    >
      {!isLargeScreen && (
        <GiHamburgerMenu
          fontSize={pathname === "/profile/posts" ? "4rem" : "2rem"}
          onClick={() => setNavToggle(true)}
          display="block"
          color="blue"
        />
      )}
      <UserProfileNav
        border={"2px solid red"}
        setNavToggle={setNavToggle}
        navToggle={navToggle}
      />
      <Box ml={{ base: "2rem", md: "3rem" }}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default UserProfile;
