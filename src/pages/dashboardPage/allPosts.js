import { Box, Center, Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { memo, useEffect, lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
// import { getRequest } from "services/request";
import defaultImage from "assets/images/defaultImage.jpeg";
import { DotLoader } from "react-spinners";
import { ThumbnailFallback } from "./utils.dashboard";

// LAZY
const AdThumbnail = lazy(() => import("../../components/adThumbnail/adThumbnail"));

function AllPosts({ 
  isLoading,
  isError,
  data,
  isFetching,
  isFetchingNextPage,
  fetchNextPage, 
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
        <DotLoader color="#36d7b7" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Box
        h="100%"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>Somthing went wrong...</Heading>
      </Box>
    );
  }

  return (
    <>
      <Heading my={4}>All Ads</Heading>
      <SimpleGrid 
        columns={[2, 2, 4]}
        spacing={4}
      >
        {data?.pages?.length !== 0 ? 
          data?.pages?.map( page => page.data.posts.map(({ postId, images, title, price, location, slug }) => {
            //TODO: optimize images
            const imagesUrl = images.split(",");

            return (
              <Link key={postId} to={`/post/${slug}`}>
                <Suspense fallback={<ThumbnailFallback />}>
                  <AdThumbnail
                    postId={postId}
                    imageSrc={imagesUrl.length ? imagesUrl[0] : defaultImage}
                    adTitle={title}
                    adPrice={price}
                    adLocation={location}
                  />
                </Suspense>
              </Link>
            );
          })
          ) : (
            <Text my={4}>No ads yet.</Text>
          )}
      </SimpleGrid>
      {
        isFetchingNextPage && (
          <Center mt={3}>
            <Spinner />
          </Center>
        )
      }
      <Box ref={ref}></Box>
      {
        isFetching && !isFetchingNextPage
          ? <Text>Background Updating...</Text>
          : null
      }
    </>
  );
}

export default memo(AllPosts);
