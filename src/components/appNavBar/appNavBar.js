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
  useMediaQuery,
} from "@chakra-ui/react";
import {
  PRIMARY_COLOR,
  COMPLEMENTARY_COLOR_DARK,
  COMPLEMENTARY_COLOR_LIGHT,
} from "utils/constants";
import NotificationBadge from "react-notification-badge";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

import SearchBox from "components/searchBox/searchBox";

function NavBar() {
  const isAuthenticated = true;
  const navItemsSpacing = useBreakpointValue({ baseline: 3, md: 6 });
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const [isLargeScreen, isSmallScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  return (
    <Box bg={PRIMARY_COLOR} h="fit-content" w="100%" py="4" px="6" mb={3}>
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
          <HStack spacing={3}>
            <Link href="#">
              <FaHeart color="#fff" size="1.4rem" />
              {/* <Icon as={FaHeart} color="whiteAlpha.900" h={5} w={5} /> */}
            </Link>
            <Link href="#">
              <HStack>
                {/* <IoMdNotifications color="#fff" size="1.5rem" /> */}
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

                {/* {isLargeScreen && (
                <Text color="whiteAlpha.900">Notifications</Text>
              )} */}
              </HStack>
            </Link>
          </HStack>

          {isAuthenticated ? (
            <Menu>
              <MenuButton>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </MenuButton>
              <MenuList>
                <NavLink to="new-post">
                  <MenuItem color={PRIMARY_COLOR}>Post new ad</MenuItem>
                </NavLink>
                <MenuDivider />
                <MenuItem>Your profile</MenuItem>
                <MenuItem>Your profile</MenuItem>
                <MenuDivider />
                <MenuItem>Settings</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            //TODO: Hide if not logged in
            <HStack>
              <Link href="#">
                <Text fontWeight="bold" color="whiteAlpha.900">
                  Sign In
                </Text>
              </Link>
              {!isSmallScreen && (
                <>
                  <Text color="whiteAlpha.900">|</Text>
                  <Link href="#">
                    <Text fontWeight="bold" color="whiteAlpha.900">
                      Register
                    </Text>
                  </Link>
                </>
              )}
            </HStack>
          )}

          {!isSmallScreen && (
            <NavLink to="new-post">
              <Button
                leftIcon={<AiOutlinePlus color="whiteAlpa.900" />}
                bg={COMPLEMENTARY_COLOR_DARK}
                //bg={COMPLEMENTARY_COLOR_DARK}
                _hover={{ opacity: "0.9" }}
                color="whiteAlpha.900"
                size="sm"
                variant="solid">
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
    </Box>
  );
}

export default NavBar;
