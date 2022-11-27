import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ShortUniqueId from "short-unique-id";
import CategoriesGrid from "components/categoriesGrid/categoriesGrid";

import { rpcClient } from "services/rpcClient";
import { useInView } from "react-intersection-observer";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Loader } from "./utils.dashboard";
import { getRequest } from "services/request";
import { useInfiniteQuery } from "@tanstack/react-query";

// LAZY
const AllPosts = lazy(() => import("./allPosts"));
const LatestPosts = lazy(() => import("./latestPosts"));

function Dashboard() {
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

  // All Posts Query
  const getAllPosts = async ({ pageParam = 1 }) => getRequest("api/posts?page=" + pageParam);
  const allPostsProps = useInfiniteQuery(
    ["ALL_POSTS"],
    getAllPosts,
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage ?? 0 // (page ?? 0) + 1,
    }
  );

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

  return (
    <Container
      maxWidth={["100%", "90vw"]}
      h="calc(100vh - 80px)"
      justifyContent="center"
    >
      <Box ref={topRef} id="top"></Box>
      <CategoriesGrid />
      
      <Suspense fallback={<Loader />}>
        <LatestPosts latestPosts={latestPosts} />
        <AllPosts {...allPostsProps} />
      </Suspense>
      {
        showBackToTop && (
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
          </Button>)
      }
    </Container>
  );
}

export default Dashboard;
