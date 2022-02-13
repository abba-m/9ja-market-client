import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import CategoriesGrid from "components/categoriesGrid/categoriesGrid";
import AdThumbnail from "components/adThumbnail/adThumbnail";

function Dashboard() {
  const uid = new ShortUniqueId({ length: 5 });
  return (
    <Container
      maxWidth={["100%", "90vw"]}
      h="calc(100vh - 80px)"
      justifyContent="center">
      <CategoriesGrid />
      <Heading mt={3}>Lates Ads</Heading>
      <SimpleGrid columns={[2, 3, 5]} spacing={2}>
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
