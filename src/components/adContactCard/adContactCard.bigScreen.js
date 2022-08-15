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
import { BsFillChatRightTextFill } from "react-icons/bs";

import { WHITE_COLOR } from "utils/constants.utils";
import { formatAmount } from "utils/format.utils";

export default function AdContactCardBig({ price, fullName, dateJoined }) {
  return (
    <Box
      minWidth={["80vw", "40vw"]}
      // minWidth={["100%", "50%"]}
      height={["20rem"]}
      borderRadius="md"
      overflow="hidden"
    >
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
            variant="solid"
          >
            Place a call
          </Button>
        </VStack>
        <Box height="50%" p="4" pl="1" gap="1rem" display="flex">
          <Box
            flexGrow="3"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Text
              fontSize="xl"
              color="primary"
              mb="1"
              mt="1"
              casing="capitalize"
            >
              <b>{fullName || "9jaMarket User"}</b>
            </Text>
            <Text fontSize="xs" color="gray.400">
              {dateJoined ? `Member since ${dateJoined}.` : ""}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" flexGrow="1">
            <Avatar
              size="xl"
              name={fullName || "New User"}
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
          variant="solid"
        >
          Start chat
        </Button>
      </Box>
    </Box>
  );
}
