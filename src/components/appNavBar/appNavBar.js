import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationBadge from "react-notification-badge";
import { AiOutlinePlus, AiOutlineUser, AiOutlinePoweroff } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FiSettings } from "react-icons/fi"
import { FaHeart } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import SearchBox from "components/searchBox/searchBox";
import Login from "components/auth/login";
import Register from "components/auth/register";

import { logoutSuccess, setLoginFormOpenFunction } from "store/actions";
import { getCurrentUser } from "graphQL/queries/user.queries";


function NavBar() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { pathname } = useLocation();
  const [currentUserState, setCurrentUserState] = useState({});

  const { isAuthenticated, currentUser } = useSelector((state) => ({ isAuthenticated: state.auth.isAuthenticated, currentUser: state.auth.user }));
  const navItemsSpacing = useBreakpointValue({ baseline: 3, md: 6 });
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  const isHomePage = pathname === "/";
  const [isLargeScreen, isSmallScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  const { data, error, loading } = useQuery(getCurrentUser, {
    variables: { id: currentUser?.id }
  })

  //console.log("imageUrl: ", `${process.env.REACT_APP_SERVER_URL}${currentUserState?.avatar?.data?.attributes?.url}`)

  const handleLogOut = () => {
    //TODO: show chakra alert dialogue
    if (!window.confirm("Are you sure you want to logout?")) return;

    dispatch(logoutSuccess());

    toast({
      position: "top",
      title: "Logout successful",
      status: "info",
      isClosable: true,
    });
  }

  useEffect(() => {
    if (data) {
      setCurrentUserState(data?.usersPermissionsUser?.data?.attributes);
    }

    if (error) {
      console.log("[userError]: ", error)
    }
  }, [data, error])


  useEffect(() => {
    dispatch(setLoginFormOpenFunction(onLoginOpen))

    //eslint-disable-next-line
  }, [])

  return (
    <Box bg="primary" h="fit-content" w="100%" py="4" px="6" mb={3}>
      <HStack spacing={["2", "4"]} justify="space-between" mb={3}>
        <HStack spacing={{ base: "3rem", md: "5rem", lg: "6rem" }} w="50%">
          <NavLink to="/">
            <Box display="flex">
              <Text color="whiteAlpha.900" fontSize="1.5rem">
                <b>9jaMarket</b>
              </Text>
            </Box>
          </NavLink>
        </HStack>

        <HStack spacing={navItemsSpacing}>
          {isAuthenticated && <HStack spacing={3} mr={3}>
            <Link href="#">
              <FaHeart color="#fff" size="1.4rem" />
            </Link>
            <Link href="#">
              <HStack>
                <Box w={7} h={7}>
                  <NotificationBadge
                    count={4}
                    style={{ top: "-5px", right: "-5px", zIndex: "1" }}
                  />
                  <Icon
                    as={IoMdNotifications}
                    color="whiteAlpha.900"
                    sx={{
                      position: "absolute",
                      top: "1.8rem",
                    }}
                    h={6}
                    w={6}
                  />
                </Box>

              </HStack>
            </Link>
          </HStack>}

          {isAuthenticated ? (
            <Menu>
              <MenuButton>
                <Avatar name={currentUserState?.fullName || "New User"} src={`${process.env.REACT_APP_SERVER_URL}${currentUserState?.avatar?.data?.attributes?.url}`} />
              </MenuButton>
              <MenuList>
                <NavLink to="new-post">
                  <MenuItem><AiOutlinePlus style={{ marginRight: ".7rem" }} /> Post new ad</MenuItem>
                </NavLink>
                <MenuDivider />
                <NavLink to="profile">
                  <MenuItem><AiOutlineUser style={{ marginRight: ".7rem" }} /> Your profile</MenuItem>
                </NavLink>
                <MenuItem><FiSettings style={{ marginRight: ".7rem" }} /> Settings</MenuItem>
                <MenuDivider />
                <MenuItem color="red.500" onClick={handleLogOut} ><AiOutlinePoweroff style={{ marginRight: ".7rem" }} /> Log out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            //TODO: Hide if not logged in
            <HStack mr={3}>
              <Button size="sm" variant="secondaryOutline" borderRadius="40px" onClick={onLoginOpen}>Sign In</Button>
              {isLargeScreen && (
                <Button size="sm" variant="secondary" borderRadius="40px" onClick={onRegisterOpen}>Register</Button>
              )}
            </HStack>
          )}

          {!isSmallScreen && (
            <NavLink to="new-post">
              <Button
                leftIcon={<AiOutlinePlus color="whiteAlpa.900" />}
                variant="secondary"
                size="sm"
              >
                Post new ad
              </Button>
            </NavLink>
          )}
        </HStack>

      </HStack>
      {isHomePage && (
        <Center>
          <SearchBox />
        </Center>
      )}

      <Login
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        openRegister={onRegisterOpen}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={onRegisterClose}
        openLogin={onLoginOpen}
      />
    </Box>
  );
}

export default NavBar;
