import { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import CategoriesGrid from "components/categoriesGrid/categoriesGrid";
import AdThumbnail from "components/adThumbnail/adThumbnail";
import { getRequest } from "services/request";
import defaultImage from "assets/images/defaultImage.jpeg";
import { useQuery } from "@tanstack/react-query";

function Dashboard({ showLogin }) {
  const uid = new ShortUniqueId({ length: 5 });

  const { state } = useLocation();
  const { displayLoginForm } = useSelector((state) => ({
    displayLoginForm: state.auth.displayLoginForm,
  }));

  // React query fetch All posts { NOTE: Remember to paginate }
  const getLatestPosts = async () => getRequest("api/posts");
  const { isLoading, isError, data } = useQuery(["ALL_POSTS"], getLatestPosts);

  useEffect(() => {
    if (state && state?.openLogin) {
      if (typeof displayLoginForm == "function") {
        displayLoginForm();
      }
    }
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
    >
      <CategoriesGrid />
      <Heading my={3}>Latest Ads</Heading>
      <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
        {data?.data.length ? (
          data?.data.map(({ postId, images, title, price, location, slug }) => {
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
                />
              </Link>
            );
          })
        ) : (
          <Text my={4}>No ads yet.</Text>
        )}
      </SimpleGrid>
      <Heading my={4}>All Ads</Heading>
      <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
        <AdThumbnail
          imageSrc="https://source.unsplash.com/random"
          adTitle="Lorem ipsom"
          adPrice={2000}
          adLocation="Garki, Abuja"
          key={uid()}
        />
        <AdThumbnail
          imageSrc="https://picsum.photos/200"
          adTitle="Doloe pica see"
          adPrice={2500}
          adLocation="Tarauni, Kano"
          key={uid()}
        />
        <AdThumbnail
          imageSrc="https://source.unsplash.com/random"
          adTitle="Inceptos facilisi nisl"
          adPrice={10100}
          adLocation="Enim, Mauris"
          key={uid()}
        />
        <AdThumbnail
          imageSrc="https://picsum.photos/200"
          adTitle="Laoreet placerat mus gravida"
          adPrice={500}
          adLocation="Libero, Sodales"
          key={uid()}
        />
        <AdThumbnail
          imageSrc="https://source.unsplash.com/random"
          adTitle="Mi habitant dignissim"
          adPrice={78900}
          adLocation="Aenean, Leo pellentesque"
          key={uid()}
        />
        <AdThumbnail
          imageSrc="https://picsum.photos/200"
          adTitle="Porttitor ut leo dignissim"
          adPrice={30000}
          adLocation="Malesuada, Ridiculus"
          key={uid()}
        />
        <AdThumbnail
          imageSrc="https://source.unsplash.com/random"
          adTitle="Himenaeos scelerisque"
          adPrice={200000}
          adLocation="Lobortis neque, Phasellus"
          key={uid()}
        />
        <AdThumbnail
          imageSrc="https://picsum.photos/200"
          adTitle="Aenean leo pellentesque proin iaculis habitasse"
          adPrice={4000}
          adLocation="Himenaeos, Scelerisque"
          key={uid()}
        />
      </SimpleGrid>
    </Container>
  );
}

export default Dashboard;
