import { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { formatAmount } from "utils/format.utils";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";

function AdThumbnail({
  imageSrc,
  adTitle,
  postId,
  adPrice,
  adLocation,
  hideSaveBtn = false,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      h={["13rem", "16rem"]}
      minW="5rem"
      boxShadow="md"
    >
      <Image src={imageSrc} alt="ad" h="60%" w="100%" />

      <Box p="2">
        <Box display="flex">
          <Box w="90%">
            <Text
              fontWeight="bold"
              fontSize={["xs", "sm"]}
              noOfLines="2"
              lineHeight="tight"
              color="grey"
            >
              {adTitle}
            </Text>
            <Text
              // mt="0.2rem"
              fontWeight="semibold"
              fontSize="sm"
              color="primary"
            >
              {formatAmount(adPrice)}
            </Text>
            <Text
              fontSize={["0.678rem", "0.875rem"]}
              color="gray.600"
              noOfLines="1"
            >
              {adLocation}
            </Text>
          </Box>
          <Box
            //TODO: Add post to favs logic
            onClick={() => setIsBookmarked(!isBookmarked)}
            ml="1"
            flexGrow="1"
            justifyContent="flex-end"
            h={["1rem"]}
            w={["1rem"]}
          >
            {!hideSaveBtn ? (
              isBookmarked ? (
                <BsBookmarkHeartFill size="100%" color="#00CC88" />
              ) : (
                <BsBookmarkHeart size="100%" color="#00CC88" />
              )
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdThumbnail;
