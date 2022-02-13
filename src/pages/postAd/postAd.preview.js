import { Box, Divider, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { PostAdContext } from "providers/postAdProvider";
import { PRIMARY_COLOR } from "utils/constants";
import { formatAmount } from "utils/format";
import ShortUniqueId from "short-unique-id";


function PreviewAd() {
  const { handleForm: { getValues }, imagesPreviewState: [images] } = useContext(PostAdContext);
  const values = getValues();
  const uid = new ShortUniqueId({length: 5});
  
  return (
    <Box w="50" h="85%" overflowY="auto" px={4}>
       {Object.entries(values).map(value => (
         <Box my={3}>
         <Text fontSize="sm" fontWeight="bold" casing="capitalize" color={PRIMARY_COLOR}>{value[0]}</Text>
         <Text fontSize="sm">{ value[0] === "price" ? formatAmount(value[1])  : value[1]}</Text>
         </Box>
       ))}
       <Divider />
       <Box mt={3}>
        <Text fontSize="md" mb={2} fontWeight="bold" casing="capitalize" color={PRIMARY_COLOR}>Images</Text>
        {images.length === 0 && <Text color="gray.400">No images selected</Text>}
        <Box display="flex" gap={3} flexWrap="wrap">
        {images.length !== 0 &&
          images.map((value) => <Image key={uid()} src={value} h={150} w={150} />)}
      </Box>
       </Box>
    </Box>
  );
}

export default PreviewAd;
