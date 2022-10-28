import { Avatar, AvatarBadge, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { rpcClient } from "services/rpcClient";

const ChatHeader = ({ recipientId }) => {
  const [userData, setUserData] = useState({});
  const [isOnline, setIsOnline] = useState(false);

  const getUserInfo = async () => {
    const response = await rpcClient.request("getUserOnline", {
      recipientId,
    });

    if (response === null) {
      console.log("[getUserInfo][ERR]: failed to get user info");
    };

    setUserData(response?.user);
    setIsOnline(response?.isOnline);
  };

  useEffect(() => {
    getUserInfo();
  }, [recipientId]);
  return (
    <>
      <Box display="flex" px={4} gap="1rem">
        <Box>
          <Avatar
            position="static"
            name={userData?.fullName}
            size="md"
            src={userData?.avatarUrl}
          >
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
