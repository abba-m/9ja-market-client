import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendRequest } from "utils/connection";

import AdThumbnail from "components/adThumbnail/adThumbnail";
import ShortUniqueId from "short-unique-id";
import defaultImage from "assets/images/defaultImage.jpeg";

function PostsView() {
  const uid = new ShortUniqueId({ length: 5 });
  const [userPosts, setUserPosts] = useState([]);
  const toast = useToast();
  const token = localStorage.getItem("token");

  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const getUserPosts = async () => {
    const [result, error] = await sendRequest(
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    if (null !== error) {
      toast({
        position: "top",
        title: "Error fetching posts",
        status: "error",
        isClosable: true,
      });
    }

    const data = await result.json();
    if (data) {
      setUserPosts(data);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [currentUser]);

  const firstName = (currentUser.fullName || "9jaMarket User").split(" ")[1];

  return (
    <Box>
      <Heading mb={4} color="secondary" size="lg">
        Posts by {firstName}
      </Heading>
      <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
        {userPosts.length ? (
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
