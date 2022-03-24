import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";


function ProfileView() {
  const { currentUser } = useSelector((state) => ({ currentUser: state.auth.user }))

  return (
    <Box>
      <Heading color="secondary">{currentUser?.fullName}</Heading>

    </Box>
  );
}

export default ProfileView;
