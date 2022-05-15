import { Avatar, AvatarBadge, Box, Divider, Spinner, Text, useToast } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import { Rating } from "react-simple-star-rating";
import { FiCamera } from "react-icons/fi";

function UserProfileNav() {
  const rating = 3;
  const token = localStorage.getItem("token");
  const toast = useToast();
  const imagePicker = useRef();
  const { pathname } = useLocation();
  const [isLoadingProfilechange, setIsLoadingProfileChange] = useState(false);


  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user
  }))

  const isProfileIndex = pathname === "/profile"

  const handleChangeProfile = async (e) => {
    setIsLoadingProfileChange(true);
    //TODO: implement loading component
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append(`avatar`, file);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/upload/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
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
      })
    }



  }


  const activeClassName = {
    color: "#00CC88",
    backgroundColor: "transparent",
  };

  const notActiveClass = {
    color: "#2C3E50",
    backgroundColor: "transparent",
  }

  const styleActiveLink = ({ isActive }) => (isActive ? activeClassName : notActiveClass);

  return (
    <Box w="25%" display="flex" flexDirection="column" pl="4">
      {/* avatar section */}
      <Box mb="3">
        <Avatar size="xl" name={currentUser?.fullName || "New User"} src={currentUser.avatarUrl}>
          <AvatarBadge boxSize="1em" bg="white">
            {isLoadingProfilechange ? <Spinner color="blue.900" /> : <FiCamera color="#00CC88" onClick={() => imagePicker.current.click()} />}
          </AvatarBadge>
        </Avatar>
        <Text my={2} wordBreak="keep-all" casing="capitalize">
          <b>{currentUser?.fullName || ""}</b>
        </Text>
        <input type="file" ref={imagePicker} onChange={handleChangeProfile} style={{ display: "none" }} accept="image/png, image/jpg" />

        <Box display="flex">
          {rating && <Rating
            ratingValue={rating}
            style={{ alignItems: "center" }}
            size="20"
            readonly
          />}
          {!rating && <Text pl="2">No Reviews</Text>}
        </Box>
      </Box>

      <Divider size="50" />

      <Box mt="3" mb="3">
        <Text>
          <NavLink style={isProfileIndex ? styleActiveLink : notActiveClass} to="/profile">Profile</NavLink>
        </Text>
        <Text>
          <NavLink style={styleActiveLink} to="/profile/posts">
            Posts
          </NavLink>
        </Text>
        <Text>
          <NavLink style={styleActiveLink} to="/profile/orders">
            Orders
          </NavLink>
        </Text>
      </Box>

      <Divider />

      <Box mt="3" mb="3">
        <Text>
          <NavLink style={styleActiveLink} to="/profile/favorites">
            Favorites
          </NavLink>
        </Text>
        <Text>
          <NavLink style={styleActiveLink} to="/profile/notifications">
            Notifications
          </NavLink>
        </Text>
      </Box>

      <Divider />

      <Box mt="3" mb="3">
        <Text>
          <NavLink style={styleActiveLink} to="/profile/reviews">
            Reviews
          </NavLink>
        </Text>
        <Text>
          <NavLink style={styleActiveLink} to="/profile/settings">
            Settings
          </NavLink>
        </Text>
      </Box>
    </Box>
  );
}

export default UserProfileNav;
