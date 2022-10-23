import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdThumbnail from "components/adThumbnail/adThumbnail";
import defaultImage from "assets/images/defaultImage.jpeg";
import { getRequest } from "services/request";
import { rpcClient } from "services/rpcClient";

function PostsView() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const toast = useToast();
  const toggleIsLoading = () => setIsLoading(val => !val);

  const { _currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const getUserPosts = async () => { 
    toggleIsLoading();

    if (isLoading) return;

    try {
      const resp = await getRequest("api/posts/me");
      setUserPosts(resp.data);
      toggleIsLoading();
    } catch (err) {
      // TODO: handle error properly
      toast({
        position: "top",
        title: "Something is wrong! Please try again.",
        status: "error",
        isClosable: true,
      }); 
      console.log("[getUserPostERR]:", err);
      toggleIsLoading();
    }
  };


  useEffect(() => {
    getUserPosts();

    (async () => 
      setTotalPostsCount((await rpcClient.request("getUserPostsCount"))?.count || 0)
    )();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading mb={4} color="secondary" size="lg">
       Your posts ({totalPostsCount})
      </Heading>
      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {userPosts?.length ? (
          userPosts.map(({ postId, images, title, price, location, slug }) => {
            //TODO: optimize images
            const imagesUrl = images.split(",");

            return (
              <Link to={`/post/${slug}`}>
                <AdThumbnail
                  key={postId}
                  postId={postId}
                  imageSrc={imagesUrl.length ? imagesUrl[0] : defaultImage}
                  adTitle={title}
                  adPrice={price}
                  adLocation={location}
                  hideSaveBtn={true}
                />
              </Link>
            );
          })
        ) : (
          <p>You don't have any post yet</p>
        )}
      </SimpleGrid>
    </Box>
  );
}

export default PostsView;
