import {
  Avatar,
  //AvatarBadge,
  Box,
  Button,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { BsFillChatRightTextFill } from "react-icons/bs"

import { WHITE_COLOR } from "utils/constants";
import { formatAmount } from "utils/format";

export default function AdContactCardBig({ price, userName }) {
  return (
    <Box
      minWidth={["80vw", "40vw"]}
      // minWidth={["100%", "50%"]}
      height={["20rem"]}
      borderRadius="md"
      overflow="hidden">
      <Box display="flex" h="16rem" flexDirection="column">
        <VStack p="4" bg="primary">
          <Center>
            <Text fontSize="36px" fontWeight="bold" color={WHITE_COLOR}>
              {formatAmount(price || 0)}
            </Text>
          </Center>
          <Button
            isFullWidth
            textColor="primary"
            bg="white"
            leftIcon={<PhoneIcon />}
            variant="solid">
            Place a call
          </Button>
        </VStack>
        <Box height="50%" p="4" pl="1" gap="1rem" display="flex">
          <Box
            flexGrow="3"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start">
            <Text
              fontSize="xl"
              color="primary"
              mb="1"
              mt="1"
              casing="capitalize">
              <b>{userName || "9jaMarket User"}</b>
            </Text>
            <Text fontSize="xs" color="gray.400">
              Member since September, 2017
            </Text>
          </Box>
          {/* FIXME: Use the Avatar component (Plus badge)*/}
          <Box display="flex" alignItems="center" flexGrow="1">
            {/* <img
              src="https://bit.ly/dan-abramov"
              alt="User Profile"
              width="80px"
              height="80px"
              style={{ borderRadius: "50%" }}
            /> */}
            <Avatar
              size="xl"
              name="User Profile"
              src="https://picsum.photos/200"
            />
          </Box>
        </Box>
      </Box>
      <Box p="2" bg="primary" h="4rem">
        <Button
          isFullWidth
          textColor="primary"
          bg="white"
          leftIcon={<BsFillChatRightTextFill />}
          variant="solid">

          Start chat
        </Button>
      </Box>
    </Box>
  );
}
