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
            Add Photos
          </Text>
          <Text color="gray.600" fontSize="xs">
            Supported formats: ".jpg", ".png"
          </Text>
          {images.length && images.length < 3 && (
            <span style={{ fontSize: ".9rem", color: "#FF0000" }}>
              (add at least 3 images)
            </span>
          )}
        </VStack>
      </Center>
      <Box display="flex" gap={3} flexWrap="wrap">
        {previews.length !== 0 &&
          // TODO: Add a delete image logic
          previews.map((value) => (
            <Image key={uid()} src={value} h={200} w={200} />
          ))}
      </Box>
    </Box>
  );
}

export default AdImagesForm;
