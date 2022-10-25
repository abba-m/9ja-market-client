import { Box, Image } from "@chakra-ui/react";
import chatBg from "../../assets/images/chatBg.jpg";

const BgImage = () => {
  return (
    <div>
      <Box
        bgSize="cover"
        bgRepeat="no-repeat"
        bgImage={chatBg}
        w="100%"
        h="calc(100vh - 80px)"
      ></Box>
    </div>
  );
};

export default BgImage;
