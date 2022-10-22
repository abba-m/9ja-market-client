import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdThumbnail from "components/adThumbnail/adThumbnail";
import ShortUniqueId from "short-unique-id";
import defaultImage from "assets/images/defaultImage.jpeg";
import { getRequest } from "services/request";
import { useQuery } from "@tanstack/react-query";

function PostsView() {
  const uid = new ShortUniqueId({ length: 5 });
  const [userPosts, setUserPosts] = useState([]);
  const toast = useToast();

  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const getUserPosts = () => getRequest("api/posts/me");
  const { isLoading, error, data } = useQuery(["ALL_USER_POSTS"], getUserPosts, {
    enabled: !!localStorage.token
  });

  useEffect(() => {
    if (data) {
      setUserPosts(data.data);
    };
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        position: "top",
        title: "Error fetching posts",
        status: "error",
        isClosable: true,
      });
    }
  }, [error]);


  const firstName = (currentUser?.fullName || "9jaMarket User").split(" ")[1];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading mb={4} color="secondary" size="lg">
       Your posts
      </Heading>
      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {userPosts?.length ? (
          userPosts.map(({ postId, images, title, price, location, slug }) => {
            //TODO: optimize images
            const imagesUrl = images.split(",");

            return (
              <Link to={`/post/${slug}`}>
                <AdThumbnail
                  key={uid()}
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
