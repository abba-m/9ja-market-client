import { Avatar, AvatarBadge, Box, Divider, Spinner, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Rating } from "react-simple-star-rating";
import { FiCamera } from "react-icons/fi";
import { stringify } from "qs";

function UserProfileNav() {
  const rating = 3;
  const [userAvatarUrl] = useState(""); //TODO: please remove
  const imagePicker = useRef();
  const { pathname } = useLocation();

  const populateQuery = stringify({
    populate: "*",
    //sort: ["createdAt:desc"]
  }, {
    encodeValuesOnly: true,
  });


  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user
  }))

  const isProfileIndex = pathname === "/profile"


  const handleChangeProfile = async (e) => {
    //TODO: submit user profile picture
    console.log("Changing...", e.target.files);

    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/5?${populateQuery}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    const datum = await res.json()
    console.log("[datum]:", datum)

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
        <Avatar size="xl" name={currentUser?.fullName || "New User"} src={userAvatarUrl}>
          <AvatarBadge boxSize="1em" bg="white">
            <FiCamera color="#00CC88" onClick={() => imagePicker.current.click()} />
          </AvatarBadge>
        </Avatar>
        <Text my={2} wordBreak="keep-all" casing="capitalize">
          <b>@{currentUser?.username || ""}</b>
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
