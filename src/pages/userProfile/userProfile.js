import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
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

  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  return (
    <Container
      maxWidth={["100%", "90vw"]}
      marginLeft="-0.7rem"
      h="calc(100vh - 100px)"
      display="flex"
      justifyContent="flex-start"
    >
      {!isLargeScreen && (
        <GiHamburgerMenu
          fontSize={"2rem"}
          onClick={() => setNavToggle(true)}
          display="flex"
        />
      )}
      <UserProfileNav
        border={"2px solid red"}
        setNavToggle={setNavToggle}
        navToggle={navToggle}
      />
      <Box ml={{ base: "-1rem", md: "3rem" }}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default UserProfile;
