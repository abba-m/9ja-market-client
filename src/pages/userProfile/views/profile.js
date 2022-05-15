import { Box, Checkbox, Heading, HStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { FaRegEdit } from "react-icons/fa"
import { formatDateJoined } from "utils/format";


function ProfileView() {
  const { currentUser } = useSelector((state) => ({ currentUser: state.auth.user }))

  return (
    <Box>
      <HStack>
        <Heading size="lg" color="secondary">{currentUser?.fullName || "9jaMarket User"}</Heading><FaRegEdit style={{ color: "#2C3E50" }} />
      </HStack>

      <Box my={2}>
        <Text color="primary">Date Joined</Text>
        <Text>{formatDateJoined(currentUser?.createdAt)}</Text>
      </Box>

      <Box my={2}>
        <Text color="primary">Email</Text>
        <Text>{currentUser?.email || ""}</Text>
      </Box>

      <Box my={2}>
        <Text color="primary">Phone</Text>
        <Text color="gray.400">{currentUser?.phone || "Not available"}</Text>
      </Box>

      <Box my={2}>
        <Checkbox isChecked={currentUser?.confirmed}>Verified Email</Checkbox>
      </Box>

    </Box>
  );
}

export default ProfileView;
