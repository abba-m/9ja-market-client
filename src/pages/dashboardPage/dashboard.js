import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { stringify } from "qs";

import { Link } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import CategoriesGrid from "components/categoriesGrid/categoriesGrid";
import AdThumbnail from "components/adThumbnail/adThumbnail";
import { sendRequest } from "utils/connection";
import defaultImage from "assets/images/defaultImage.jpeg"

function Dashboard({ showLogin }) {
  const uid = new ShortUniqueId({ length: 5 });
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  //TODO: get All posts 
  //const [allPosts,  setAllPosts] = useState([]);
  const { state } = useLocation();
  const { displayLoginForm } = useSelector((state) => ({ displayLoginForm: state.auth.displayLoginForm }));

  const populateQuery = stringify({
    populate: "*",
    sort: ["createdAt:desc"]
  }, {
    encodeValuesOnly: true,
  });

  useEffect(() => {
    if (state && state?.openLogin) {
      if (typeof displayLoginForm == "function") {
        displayLoginForm();
      }
    }
  }, []);

  const getLatestPosts = async () => {
    setIsLoading(true);
    const [res, error] = await sendRequest(fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts?${populateQuery}`));

    if (error) {
      console.log("[getPostsError]:", error)
    }

    const data = await res.json()
    console.log("[REstPosts]", data)
    if (data && data?.data) {
      setIsLoading(false);
      setPostsToDisplay(data?.data)
    }
  };

  useEffect(() => {
    getLatestPosts();
  }, []);

  if (isLoading) {
    return (
      <Box h="100vh" w="100vw" display="flex" alignItems="center" justifyContent="center">
        <Spinner color="primary" thickness="5px" size='xl' />
      </Box>
    )
  }

  return (
    <Container
      maxWidth={["100%", "90vw"]}
      h="calc(100vh - 80px)"
      justifyContent="center">
      <CategoriesGrid />
      <Heading my={3}>Latest Ads</Heading>
      <SimpleGrid columns={[2, 3, 4, 5]} spacing={4}>
        {
          postsToDisplay.length !== 0 && postsToDisplay.map(({ id, attributes }) => {
            const { images, title, price, location } = attributes;
            const imgPath = images?.data ? images?.data[0]?.attributes?.url : null;
            const imageUrl = `${process.env.REACT_APP_SERVER_URL}${imgPath}`;

            return (
              <AdThumbnail
                key={uid()}
                postId={id}
                imageSrc={imgPath ? imageUrl : defaultImage}
                adTitle={title}
                adPrice={price}
                adLocation={location}
              />
            )
          })
        }
        {!postsToDisplay.length && <Text my={4} >No ads yet.</Text>}
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
      {/* <Text>Hello from Dashboard</Text>
      <Link to="/test">
        <Button mt={4} variant="primary">
          Goto Test
        </Button>
      </Link> */}
    </Container>
  );
}

export default Dashboard;
