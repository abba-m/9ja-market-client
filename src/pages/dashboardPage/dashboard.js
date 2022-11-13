import { createRef, useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import CategoriesGrid from "components/categoriesGrid/categoriesGrid";
import AdThumbnail from "components/adThumbnail/adThumbnail";
import { getRequest } from "services/request";
import defaultImage from "assets/images/defaultImage.jpeg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { rpcClient } from "services/rpcClient";
import { useInView } from "react-intersection-observer";
import { ArrowUpIcon } from "@chakra-ui/icons";

function Dashboard() {
  const uid = new ShortUniqueId({ length: 5 });
  const scrollRef = createRef();


  const { ref, inView } = useInView();
  const { ref: topRef, inView: topInView } = useInView();
  const { state } = useLocation();
  const { displayLoginForm } = useSelector((state) => ({
    displayLoginForm: state.auth.displayLoginForm,
  }));
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [latestPosts, setLatestPosts] = useState([]);

  const getLatestPosts = async () => {
    const posts = await rpcClient.request("getLatestPosts");
    if (!posts.length) return;
    setLatestPosts(posts);
  };

  const getAllPosts = async ({ pageParam = 1 }) => getRequest("api/posts?page=" + pageParam);
  const { 
    isLoading, 
    isError, 
    data, 
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["ALL_POSTS"], 
    getAllPosts, 
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage ?? 0 // (page ?? 0) + 1,
    }
  );

  useMemo(() => {
    if (inView) {
      fetchNextPage();
    }
  } ,[inView]);

  useMemo(() => {
    if (!topInView) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  }, [topInView]);


  useEffect(() => {
    if (state && state?.openLogin) {
      if (typeof displayLoginForm == "function") {
        displayLoginForm();
      }
    }

    getLatestPosts();
  }, []);

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

  if (isError) {
    return (
      <Box
        h="100vh"
        w="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>Somthing went wrong...</Heading>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={["100%", "90vw"]}
      h="calc(100vh - 80px)"
      justifyContent="center"
      ref={scrollRef}
    >
      <Box ref={topRef} id="top"></Box>
      <CategoriesGrid />
      <Heading my={3}>Latest Ads</Heading>
      <SimpleGrid
        marginInline="auto"
        maxW="1200px"
        columns={[2, 2, 4]}
        spacing={4}
      >
        {latestPosts.length ? (
          latestPosts.map(({ postId, images, title, price, location, slug }) => {
            //TODO: optimize images
            const imagesUrl = images.split(",");

            return (
              <Link key={uid()} to={`/post/${slug}`}>
                <AdThumbnail
                  key={uid()}
                  postId={postId}
                  imageSrc={imagesUrl.length ? imagesUrl[0] : defaultImage}
                  adTitle={title}
                  adPrice={price}
                  adLocation={location}
                />
              </Link>
            );
          })
        ) : (
          <Text my={4}>No ads yet.</Text>
        )}
      </SimpleGrid>
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
              <Link key={uid()} to={`/post/${slug}`}>
                <AdThumbnail
                  key={uid()}
                  postId={postId}
                  imageSrc={imagesUrl.length ? imagesUrl[0] : defaultImage}
                  adTitle={title}
                  adPrice={price}
                  adLocation={location}
                />
              </Link>
            );
          })
          ) : (
            <Text my={4}>No ads yet.</Text>
          )}
      </SimpleGrid>
      {isFetchingNextPage && (
        <Center mt={3}>
          <Spinner />
        </Center>
      )}
      <Box ref={ref}></Box>
      {isFetching && !isFetchingNextPage
        ? <Text>Background Updating...</Text>
        : null}
      { showBackToTop && (
        <Button 
          pos="fixed"
          bottom="10%"
          right="10%"
          zIndex="2"
          // onClick={() => scroll.scrollTo(target)}
          onClick={() => window?.scrollTo(0, 0)}
          variant="primaryOutline"
        >
          <ArrowUpIcon />
        </Button>)}
    </Container>
  );
}

export default Dashboard;
