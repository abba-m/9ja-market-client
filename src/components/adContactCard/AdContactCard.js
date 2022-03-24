import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";

import { WHITE_COLOR } from "utils/constants";
import { formatAmount } from "utils/format";

export default function AdContactCard() {
  return (
    <Box
      w={["80vw", "40vw"]}
      height={["20rem"]}
      borderRadius="md"
      overflow="hidden">
      <Box display="flex" h="16rem" flexDirection="column">
        <VStack p="4" bg="primary">
          <Center>
            <Text fontSize="36px" fontWeight="bold" color={WHITE_COLOR}>
              {formatAmount(200000)}
            </Text>
          </Center>
          {/* FIXME: Put the left phone icon */}
          <Button
            isFullWidth
            textColor="primary"
            bg="white"
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
              <b>steve williams</b>
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
              size="2xl"
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
          variant="solid">
          Start chat
        </Button>
      </Box>
    </Box>
  );
}
