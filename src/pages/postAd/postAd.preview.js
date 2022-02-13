import { Box, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { PostAdContext } from "providers/postAdProvider";
import { PRIMARY_COLOR } from "utils/constants";


function PreviewAd() {
  
  const { handleForm: { getValues } } = useContext(PostAdContext);
  const values = getValues();
  
  return (
    <Box w="50" h="85%" overflowY="auto" px={4}>
       {Object.entries(values).map(value => (
         <>
         <Heading size="md" color={PRIMARY_COLOR}>{value[0]}</Heading>
         <Text>{value[1]}</Text>
         </>
       ))}
    </Box>
  );
}

export default PreviewAd;
