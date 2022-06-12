import { Box, Container, Heading, Spinner, useMediaQuery, useToast } from "@chakra-ui/react";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImagesCarousel from "components/adImagesCarousel/imagesCarousel";
import AdContactCard from "components/adContactCard/adContactCard";
import { formatDateJoined } from "utils/format";

export default function SingleAdPage() {
  const { slug } = useParams();
  const toast = useToast();
  const [postToDisplay, setPostToDisplay] = useState({});
  const [postImages, setPostImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  const getPost = async () => {
    //TODO: use react query
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/${slug}`);
      const data = await res.json();

      if (data && data?.error) {
        setIsLoading(false);
        console.log("[GetPostError]:", data.error)
      }

      setPostToDisplay(data)
      setIsLoading(false);
    } catch (err) {
      toast({
        position: "top",
        title: `Failed to load post`,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false)
      console.log(err)
    }

  }

  useEffect(() => {
    getPost()
  }, [])

  useEffect(() => {
    if (postToDisplay.images) {
      const imagesUrls = postToDisplay.images.split(",").map(url => ({ image: url }));
      setPostImages(imagesUrls);
    }
  }, [postToDisplay])

  if (isLoading) {
    return (
      <Box h="100vh" w="100vw" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="primary" thickness="5px" size='xl' />
      </Box>
    )
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Container maxWidth={["100%", "90vw"]}
        h="calc(100vh - 80px)"
        justifyContent="center">
        <Heading my={3} > {postToDisplay ? postToDisplay?.title : "Loading title..."}</Heading>
        {/* <Heading>Hello iPhone 13</Heading> */}
        <Box display="flex" mx="auto" flexDirection={isLargeScreen ? "row" : "column"} gap={4} flexWrap="wrap">
          <Box>
            {postImages.length && <ImagesCarousel data={postImages} />}
          </Box>
          <Box>
            {postToDisplay.title && <AdContactCard price={postToDisplay.price} fullName={postToDisplay?.User.fullName} dateJoined={formatDateJoined(postToDisplay?.User?.createdAt)} />}
          </Box>
        </Box>
      </Container >
    </Suspense>
  );
}
