import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { PRIMARY_COLOR, WHITE_COLOR } from "utils/constants";

import "./navStyle.css";

import bellIcon from "assets/icons/bellIcon.svg";
import heartIcon from "assets/icons/heartIcon.svg";

function NavBar() {
  return (
    <Box
      bg={WHITE_COLOR}
      h="70px"
      w="100%"
      style={{ paddingRight: "70px", paddingLeft: "50px" }}
      p="4"
      mb="3"
    >
      <HStack spacing={["2", "4"]} justify="space-between">
        <HStack spacing={{ base: "3rem", md: "5rem", lg: "6rem" }} w="50%">
          <Box display="flex">
            <Text color={PRIMARY_COLOR} fontSize="2rem">
              GreenVolition
            </Text>
          </Box>
          <HStack spacing="4">
            <Text className="nav-link">Auto</Text>
            <Text className="nav-link">Property</Text>
            <Text className="nav-link">Work</Text>
            <Text className="nav-link">Services</Text>
            <Text className="nav-link">More</Text>
          </HStack>
        </HStack>

        <Box display="flex" gap="4">
          <Image src={heartIcon} alt="Favorite icon" />
          <Image src={bellIcon} alt="Notification icon" />
          <Button variant="primary">Place an ad</Button>
          <Button variant="primary">Sign In</Button>
        </Box>
      </HStack>
    </Box>
  );
}

export default NavBar;
