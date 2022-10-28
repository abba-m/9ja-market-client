import { Avatar, Box, Text } from "@chakra-ui/react";
import chatBg from "assets/images/chatBg.jpg";

const NotificationThumbnail = () => {
  return (
    <>
      <Box
        padding="10px"
        gap="2rem"
        maxW="30rem"
        _hover={{ bgColor: "secondary", color: "white" }}
        h="5rem"
      >
        <Box display="flex" alignItems="center" justifyContents="center">
          <Avatar name={"Adamu Tako"} size="md" src={chatBg}></Avatar>
          <Text>
            <b>Adamu Tako</b> and <b>Senior PM</b> saved your post
            <Text noOfLines={1}>
              Some random shit, you may call it notification text/ body. ou may
              call it notification text/ body.
            </Text>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default NotificationThumbnail;
