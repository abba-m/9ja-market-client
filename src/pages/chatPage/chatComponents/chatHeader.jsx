import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { rpcClient } from "services/rpcClient";

const ChatHeader = ({ recipientId }) => {
  const [userData, setUserData] = useState({});
  const [isOnline, setIsOnline] = useState(false);

  const getUserInfo = async () => {
    const response = await rpcClient.request("getUserOnline", {
      recipientId,
    });
    console.log(recipientId);
    console.log(response.user);

    if (response === null) throw new Error("Something went wrong");

    setUserData(response.user);
    setIsOnline(response.isOnline);
  };

  useEffect(() => {
    getUserInfo();
  }, [recipientId]);
  return (
    <>
      <Box display="flex" gap="1rem">
        <Box>
          <Avatar name={userData?.fullName} size="md" src={userData?.avatarUrl}>
            {isOnline && <AvatarBadge boxSize="1.25em" bg="green.500" />}
          </Avatar>
        </Box>

        <Flex direction="column" justifyContent="space-evenly">
          <Flex
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="1rem" noOfLines={1} className="chat__name">
              {userData?.fullName}
            </Text>
            <Text fontSize="0.5rem" noOfLines={1} className="chat__name">
              {isOnline ? "Online" : "last seen @ ..."}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default ChatHeader;
