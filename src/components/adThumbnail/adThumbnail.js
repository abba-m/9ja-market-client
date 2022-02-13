import { useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { formatAmount } from "utils/format";
import { PRIMARY_COLOR } from "utils/constants";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";

const sampleTitles = [
  "Hello world there how are you and how is the family",
  "Lorem ipsum dolor sit amet consectetur adipiscing",
  "Hello World",
  "Tiny Kiddies Jacket",
];

const defaultData = {
  ImageSrc: "https://picsum.photos/200",
  AdTitle: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
  AdPrice: 198000,
  AdLocation: "Garki, Abuja",
};

function AdThumbnail({ imageSrc, adTitle, adPrice, adLocation }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      h={["13rem", "16rem"]}
      minW="5rem"
      boxShadow="md">
      <Image src={imageSrc} alt="ad" h="60%" w="100%" />

      <Box p="2">
        <Box display="flex">
          <Box w="90%">
            <Text
              fontWeight="bold"
              fontSize={["xs", "sm"]}
              noOfLines="2"
              lineHeight="tight"
              color="grey">
              {adTitle}
            </Text>
            <Text
              // mt="0.2rem"
              fontWeight="semibold"
              fontSize="sm"
              color={PRIMARY_COLOR}>
              {formatAmount(adPrice)}
            </Text>
            <Text fontSize={["0.678rem", "0.875rem"]} color="gray.600">
              {adLocation}
            </Text>
          </Box>
          <Box
            onClick={() => setIsBookmarked(!isBookmarked)}
            ml="1"
            flexGrow="1"
            justifyContent="flex-end"
            h={["1rem"]}
            w={["1rem"]}>
            {isBookmarked ? (
              <BsBookmarkHeartFill size="100%" color={PRIMARY_COLOR} />
            ) : (
              <BsBookmarkHeart size="100%" color={PRIMARY_COLOR} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdThumbnail;
