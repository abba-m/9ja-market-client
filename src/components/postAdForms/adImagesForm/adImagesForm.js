import { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import "./adImagesForm.css";

import ShortUniqueId from "short-unique-id";
import cameraPlus from "assets/images/cameraPlus.png";
import { PostAdContext } from "providers/postAdProvider";

function AdImagesForm() {
  const { currentImagesState, imagesPreviewState } = useContext(PostAdContext);
  const [images, setImages] = currentImagesState;
  const [previews] = imagesPreviewState;
  const uid = new ShortUniqueId({ length: 5 });

  const handleAddFile = (e) => {
    setImages([...images, e.target.files]);
  };

  return (
    <Box w="50" h="85%" overflowY="auto" px={4} pt={2}>
      {/* <Center>
        <Heading size="lg">Images</Heading>
      </Center> */}
      <Center>
        <Box className="custom-file-input-wrapper">
          <Avatar
            className="custom-file-input-avatar"
            name="camra-plus"
            size="xl"
            src={cameraPlus}
          />
          <input
            type="file"
            className="custom-file-input"
            onChange={handleAddFile}
            multiple
            accept="image/png, image/jpg"
            max="10"
          />
        </Box>
        <br />
      </Center>
      <Center>
        <VStack my={2} spacing={-1}>
          <Text color="gray.600" fontSize="2xl">
            Add Photo
          </Text>
          <Text color="gray.600" fontSize="xs">
            Supported formats: ".jpg", ".png"
          </Text>
        </VStack>
      </Center>
      <SimpleGrid columns={["2", "3", "4"]} spacing={2}>
        {previews.length !== 0 &&
          previews.map((value) => <Image key={uid()} src={value} />)}
      </SimpleGrid>
    </Box>
  );
}

export default AdImagesForm;
