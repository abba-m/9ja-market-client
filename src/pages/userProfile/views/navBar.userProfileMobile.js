import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import { Rating } from "react-simple-star-rating";
import { FiCamera } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

function UserProfileNavMobile({ navToggle, setNavToggle }) {
  const rating = 3;
  const token = localStorage.getItem("token");
  const toast = useToast();
  const imagePicker = useRef();
  const { pathname } = useLocation();
  const [isLoadingProfilechange, setIsLoadingProfileChange] = useState(false);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const isProfileIndex = pathname === "/profile";

  const handleChangeProfile = async (e) => {
    setIsLoadingProfileChange(true);
    //TODO: implement loading component
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(
        "http://localhost:1335/api/users/upload/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data[0] === 1) {
        toast({
          position: "top",
          title: "Profile photo updated",
          status: "info",
          isClosable: true,
        });
        setIsLoadingProfileChange(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoadingProfileChange(false);
      toast({
        position: "top",
        title: "Upload failed. Try again later.",
        status: "error",
        isClosable: true,
      });
    }
  };

  const activeClassName = {
    color: "#00CC88",
    backgroundColor: "transparent",
  };

  const notActiveClass = {
    color: "#2C3E50",
    backgroundColor: "transparent",
  };

  const styleActiveLink = ({ isActive }) =>
    isActive ? activeClassName : notActiveClass;

  return (
    <Box
      backgroundColor="white"
      w={{ base: "55%", md: "30%" }}
      borderRight=".5px solid #2C3E50"
      h="calc(100vh - 80px)"
      zIndex={{ base: "10", md: "0" }}
      position="fixed"
      display={navToggle ? "flex" : "none"}
      flexDirection="column"
      pl="20px"
      // border="1px solid red"
    >
      <Box
        pos="absolute"
        width="fit-content"
        mx="75%"
      >
        <MdCancel
          fontSize={"1.8rem"}
          color="#E53E3E"
          onClick={() => setNavToggle(false)}
        />
      </Box>
      {/* <MdCancel
        fontSize={"1.8rem"}
        color="#E53E3E"
        onClick={() => setNavToggle(false)}
      /> */}
      {/* avatar section */}
      <Box mb="3">
        <Avatar
          size="xl"
          name={currentUser?.fullName || "New User"}
          src={currentUser?.avatarUrl}
        >
          <AvatarBadge boxSize="1em" bg="white">
            {isLoadingProfilechange ? (
              <Spinner color="blue.900" />
            ) : (
              <FiCamera
                color="#00CC88"
                onClick={() => imagePicker.current.click()}
              />
            )}
          </AvatarBadge>
        </Avatar>
        <Text my={2} wordBreak="keep-all" casing="capitalize">
          <b>{currentUser?.fullName || ""}</b>
        </Text>
        <input
          type="file"
          ref={imagePicker}
          onChange={handleChangeProfile}
          style={{ display: "none" }}
          accept="image/png, image/jpg"
        />

        <Box display="flex">
          {rating && (
            <Rating
              ratingValue={rating}
              style={{ alignItems: "center" }}
              size="20"
              readonly
            />
          )}
          {!rating && <Text pl="2">No Reviews</Text>}
        </Box>
      </Box>
      <Divider shadow="dark-lg" />
      <Box mt="3" mb="3">
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={isProfileIndex ? styleActiveLink : notActiveClass}
            to="/profile"
          >
            Profile
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={styleActiveLink}
            to="/profile/posts"
          >
            Posts
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={styleActiveLink}
            to="/profile/addresses"
          >
            Addresses
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={styleActiveLink}
            to="/profile/orders"
          >
            Orders
          </NavLink>
        </NavListItem>
      </Box>
      <Divider shadow="dark-lg" />
      <Box mt="3" mb="3">
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={styleActiveLink}
            to="/profile/favorites"
          >
            Favorites
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={styleActiveLink}
            to="/profile/notifications"
          >
            Notifications
          </NavLink>
        </NavListItem>
      </Box>
      <Divider shadow="dark-lg" />
      <Box mt="3" mb="3">
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={styleActiveLink}
            to="/profile/reviews"
          >
            Reviews
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink
            onClick={() => setNavToggle(false)}
            style={styleActiveLink}
            to="/profile/settings"
          >
            Settings
          </NavLink>
        </NavListItem>
      </Box>
    </Box>
  );
}

export default UserProfileNavMobile;


const NavListItem = ({ children }) => {
  return <Text my={1}>{children}</Text>;
};
