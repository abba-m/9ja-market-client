import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { BsFillChatRightTextFill } from "react-icons/bs"

import { formatAmount } from "utils/format";

export default function AdContactCardSmall({ price, userName }) {
  return (
    <Box
      w="100%"
      mx="auto"
      height="fit-content"
      borderRadius="md"
      bg="primary"
      overflow="hidden">
      {/* Call & Message Buttons */}
      <Box display="flex" h="16rem" flexDirection="column">
        <Box display="flex" gap={2} px={2} py={4}>
          <Button
            isFullWidth
            textColor="primary"
            bg="white"
            leftIcon={<PhoneIcon />}
            variant="solid">
            Place a call
          </Button>

          <Button
            isFullWidth
            textColor="primary"
            bg="white"
            leftIcon={<BsFillChatRightTextFill />}
            variant="solid">
            Start chat
          </Button>
        </Box>

        {/* Price */}
        <Center bg="whiteAlpha.900">
          <Text fontSize="36px" fontWeight="bold" p={2} color="primary">
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
            alignItems="flex-start">
            <Text
              fontSize="xl"
              color="#fff"
              mb="1"
              mt="1"
              casing="capitalize">
              <b>{userName || "9jaMarket User"}</b>
            </Text>
            <Text fontSize="xs" color="secondary">
              Member since September, 2017
            </Text>
          </Box>
          {/* TODO: Add badge to Avatar */}
          <Box display="flex" alignItems="center" flexGrow="1">
            <Avatar
              size="xl"
              name="User Profile"
              src="https://picsum.photos/200"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
