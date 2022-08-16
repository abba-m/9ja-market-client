import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImagesCarousel from "components/adImagesCarousel/imagesCarousel";
import AdContactCard from "components/adContactCard/adContactCard";
import { formatDateJoined } from "utils/format.utils";
import { getRequest } from "services/request";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function SingleAdPage() {
  const { slug } = useParams();
  const toast = useToast();
  const [postToDisplay, setPostToDisplay] = useState({});
  const [postImages, setPostImages] = useState([]);
  const currentUser = useSelector((state) => (state.auth.user));

  const getDetailedPost = () => getRequest(`api/posts/${slug}`);
  const { isLoading, error, data } = useQuery(["DETAILED_POST"], getDetailedPost);
  const isPostOwner = postToDisplay?.User?.userId === currentUser?.userId;

  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  useEffect(() => {
    if (error) {
      toast({
        position: "top",
        title: error || "Failed to load post",
        status: "error",
        isClosable: true,
      });
      console.log("[GetPostError]:", error);
    }
  });

  useEffect(() => {
    if (data) {
      setPostToDisplay(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (postToDisplay.images) {
      const imagesUrls = postToDisplay.images
        .split(",")
        .map((url) => ({ image: url }));
      setPostImages(imagesUrls);
    }
  }, [postToDisplay]);

  if (isLoading) {
    return (
      <Box
        h="100vh"
        w="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner color="primary" thickness="5px" size="xl" />
      </Box>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Container
        maxWidth="90vw"
        h="calc(100vh - 80px)"
        centerContent
      >
        <Heading my={3} textAlign="left">
          {postToDisplay?.title}
        </Heading>
        {/* <Heading>Hello iPhone 13</Heading> */}
        <Flex
          //border="2px solid red"
          w="100%"
          direction={ isLargeScreen ? "row" : "column" }
          justifyContent="space-between"
          gap="5%"
          p={2}
        >
          <Box w="100%">{postImages.length && <ImagesCarousel data={postImages} />}</Box>

          <Box w="100%">
            {postToDisplay.title && (
              <AdContactCard
                price={postToDisplay.price}
                fullName={postToDisplay?.User.fullName}
                dateJoined={formatDateJoined(postToDisplay?.User?.createdAt)}
                isPostOwner={isPostOwner}
              />
            )}
          </Box>
        </Flex>
        <Box p={4}>
          <Heading size="md">Description</Heading>
          <Text>{postToDisplay?.description}</Text>
          <Heading mt={3} size="md">Location</Heading>
          <Text casing="capitalize">{postToDisplay?.location}</Text>
          
        </Box>

        {
          isPostOwner &&
              <Flex gap="4rem" p={2} mb={6} w="100%" justifyContent="space-between">
                <Button w="100%" variant="primary">Edit Post</Button>
                <Button w="100%" colorScheme="red">Delete Post</Button>
              </Flex>
        }
      </Container>
    </Suspense>
  );
}
