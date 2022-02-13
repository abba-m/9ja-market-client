import { Box, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { PostAdContext } from "providers/postAdProvider";


function PreviewAd() {
  
  const { handleForm: { getValues } } = useContext(PostAdContext);
  const values = getValues()
  console.log(Object.entries(values));


  
  return (
    <Box w="50" h="85%" overflowY="auto" px={4}>
      <Text>Hello preview Component</Text> 
       {Object.entries(values).map(value => (
         <>
         <Heading>{value[0]}</Heading>
         <Text>{value[1]}</Text>
         </>
       ))}
    </Box>
  );
}

export default PreviewAd;
