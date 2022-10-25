import { Avatar, Box, Button, Center, Text } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { BsFillChatRightTextFill } from "react-icons/bs";

import { formatAmount } from "utils/format.utils";
import { useNavigate } from "react-router-dom";

export default function AdContactCardSmall({
  price,
  fullName,
  dateJoined,
  isPostOwner,
  userId,
  avatar,
  phone,
}) {
  const navigate = useNavigate();

  const handleProfilePageNav = (userId) => {
    if (isPostOwner) {
      navigate("/profile");
    } else {
      navigate(`/profilePage/${userId}`);
    }
  };

  return (
    <Box
      w="100%"
      mx="auto"
      height="fit-content"
      borderRadius="md"
      bg="primary"
      overflow="hidden"
    >
      {/* Call & Message Buttons */}
      <Box display="flex" h="16rem" flexDirection="column">
        <Box display="flex" gap={2} px={2} py={4}>
          <a href={`tel:${phone}`}>
            <Button
              isFullWidth
              textColor="primary"
              bg="white"
              leftIcon={<PhoneIcon />}
              variant="solid"
              isDisabled={isPostOwner}
            >
              Place a call
            </Button>
          </a>

          <Button
            isFullWidth
            textColor="primary"
            bg="white"
            leftIcon={<BsFillChatRightTextFill />}
            variant="solid"
            isDisabled={isPostOwner}
          >
            Start chat
          </Button>
        </Box>

        {/* Price */}
        <Center bg="whiteAlpha.900">
          <Text
            fontSize={{ base: "26px", md: "36px" }}
            fontWeight="bold"
            p={2}
            color="primary"
          >
            {formatAmount(price || 0)}
          </Text>
        </Center>

        {/* user name & profile */}
        <Box height="50%" px={4} bg="primary" gap={2} display="flex">
          <Box
            flexGrow="3"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            minHeight={"calc(fit-content + 100px)"}
          >
            <Text
              onClick={() => handleProfilePageNav(userId)}
              cursor="pointer"
              fontSize="xl"
              color="#fff"
              mb="1"
              mt="1"
              casing="capitalize"
            >
              <b>{fullName || "9jaMarket User"}</b>
            </Text>
            <Text fontSize="xs" color="secondary">
              {dateJoined ? `Member since ${dateJoined}.` : ""}
            </Text>
          </Box>
          {/* TODO: Add online badge to Avatar */}
          <Box display="flex" alignItems="center" flexGrow="1">
            <Avatar
              onClick={() => handleProfilePageNav(userId)}
              cursor="pointer"
              size={"xl"}
              name={fullName}
              src={avatar}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
