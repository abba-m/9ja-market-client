import { Box, Button, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import notFoundImage from "assets/images/404-removebg.png";

function NotFound() {
  return (
    <Box
      justifyContent="center"
      display="flex"
      flexDirection="column"
      w="100vw"
    >
      {/* <Text fontSize="10rem" color="primary" fontFamily="tahoma">
        404
      </Text> */}
      <Box justifyContent="center" display="flex" width="100vw">
        <Image src={notFoundImage} width="500px" alt="404" />
      </Box>
      <Text fontSize="5xl" mb="4">
        Page not found
      </Text>
      <Link to="/">
        <Button variant="primary">Goto Home</Button>
      </Link>
    </Box>
  );
}

export default NotFound;
