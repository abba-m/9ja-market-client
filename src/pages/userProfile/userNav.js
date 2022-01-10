import { Avatar, AvatarBadge, Box, Divider, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { Rating } from "react-simple-star-rating";
import { Camera } from "react-feather";

import faPolo from "assets/images/faPolo.jpeg";
import { PRIMARY_COLOR } from "utils/constants";

function UserProfileNav() {
  const rating = 3;

  const activeClassName = {
    color: PRIMARY_COLOR,
  };

  const styleActiveLink = ({ isActive }) => (isActive ? activeClassName : null);

  return (
    <Box w="25%" display="flex" flexDirection="column" pl="4">
      {/* avatar section */}
      <Box mb="3">
        <Avatar size="xl" name="User Profile" src={faPolo}>
          <AvatarBadge boxSize="1em" bg="white">
            <Camera color={PRIMARY_COLOR} />
          </AvatarBadge>
        </Avatar>
        <Text fontSize="2xl" mb="1" mt="1" casing="capitalize">
          <b>steve jobs</b>
        </Text>

        <Box display="flex">
          <Rating
            ratingValue={rating}
            style={{ alignItems: "center" }}
            size="20"
            readonly
          />
          <Text pl="2">No Reviews</Text>
        </Box>
      </Box>

      <Divider size="50" />

      <Box mt="3" mb="3">
        <Text>
          <NavLink to="/profile">Profile</NavLink>
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
