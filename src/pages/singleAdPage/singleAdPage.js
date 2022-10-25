import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Portal,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImagesCarousel from "components/adImagesCarousel/imagesCarousel";
import AdContactCard from "components/adContactCard/adContactCard";
import { formatDateJoined } from "utils/format.utils";
import { getRequest } from "services/request";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import DeletePostModal from "components/modals/deletePostModal";

export default function SingleAdPage() {
  const { slug } = useParams();
  const toast = useToast();
  const [postToDisplay, setPostToDisplay] = useState({});
  const [postErrorStatus, setPostErrorStatus] = useState("");
  const [postImages, setPostImages] = useState([]);
  const currentUser = useSelector((state) => (state.auth.user));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const getDetailedPost = () => getRequest(`api/posts/${slug}`);
  const { isLoading, error, data } = useQuery([`DETAILED_POST_${slug}`], getDetailedPost, );
  const isPostOwner = postToDisplay?.User?.userId === currentUser?.userId;

  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  useEffect(() => {
   
  });

  useMemo(() => {
    if (data?.data) {
      setPostToDisplay(data?.data);
      setPostErrorStatus("");
    } else {
      setPostErrorStatus("not_found");
    }

    if (error) {
      setPostErrorStatus("error");
      toast({
        position: "top",
        title: error || "Failed to load post",
        status: "error",
        isClosable: true,
      });
      console.log("[GetPostError]:", error);
    }
  }, [data, error]);

  useMemo(() => {
    if (postToDisplay?.images) {
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

  if (postErrorStatus !== "") {
    return (
      <Box
        h="50vh"
        w="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack>
          {postErrorStatus === "not_found" && <Heading>Uh oh! No post found...</Heading>}
          {postErrorStatus === "error" && <Heading>Something went wrong, Check network connection...</Heading>}
          <Button onClick={() => navigate("/")} variant="primary">Go to home</Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Container maxWidth="90vw" h="calc(100vh - 80px)" centerContent>
        <Heading my={3} textAlign="left">
          {postToDisplay?.title}
        </Heading>
        {/* <Heading>Hello iPhone 13</Heading> */}
        <Flex
          //border="2px solid red"
          w="100%"
          direction={isLargeScreen ? "row" : "column"}
          justifyContent="space-between"
          gap="5%"
          p={2}
        >
          <Box w="100%">
            {postImages.length && <ImagesCarousel data={postImages} />}
          </Box>

          <Box w="100%">
            {postToDisplay?.title && (
              <AdContactCard
                price={postToDisplay.price}
                fullName={postToDisplay?.User.fullName}
                dateJoined={formatDateJoined(postToDisplay?.User?.createdAt)}
                isPostOwner={isPostOwner}
                userId={postToDisplay?.User?.userId}
              />
            )}
          </Box>
        </Flex>
        <Box p={4}>
          <Heading size="md">Description</Heading>
          <Text>{postToDisplay?.description}</Text>
          <Heading mt={3} size="md">
            Location
          </Heading>
          <Text casing="capitalize">{postToDisplay?.location}</Text>
        </Box>

        {isPostOwner && (
          <Flex gap="4rem" p={2} mb={6} w="100%" justifyContent="space-between">
            <Button w="100%" variant="primary">
              Edit Post
            </Button>
            <Button w="100%" onClick={onOpen} colorScheme="red">
              Delete Post
            </Button>
          </Flex>
        )}
        <Portal>
          <DeletePostModal
            isOpen={isOpen}
            onClose={onClose}
            postTitle={postToDisplay?.title}
            postId={postToDisplay?.postId}
          />
        </Portal>
      </Container>
    </Suspense>
  );
}
