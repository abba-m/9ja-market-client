import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import defaultImage from "assets/images/defaultImage.jpeg";
import { lazy, Suspense } from "react";
import { ThumbnailFallback } from "./utils.dashboard";

// LAZY
const AdThumbnail = lazy(() => import("../../components/adThumbnail/adThumbnail"));

function LatestPosts ({ latestPosts }) {
  const uid = new ShortUniqueId({ length: 6 });
  return (
    <>
      <Heading my={3}>Latest Ads</Heading>
      <SimpleGrid
        marginInline="auto"
        maxW="1200px"
        columns={[2, 2, 4]}
        spacing={4}
      >
        {latestPosts.length ? (
          latestPosts.map(({ postId, images, title, price, location, slug }) => {
            const imagesUrl = images.split(",");

            return (
              <Link key={uid()} to={`/post/${slug}`}>
                <Suspense fallback={<ThumbnailFallback />}>
                  <AdThumbnail
                    key={uid()}
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
    </>
  );
}

export default LatestPosts;