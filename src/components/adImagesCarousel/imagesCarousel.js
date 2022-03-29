import { Box } from "@chakra-ui/react";
import { Carousel } from "react-carousel-minimal";

function ImagesCarousel({ data }) {
  const slideNumberStyle = {
    fontSize: "10px",
    fontWeight: "bold",
  };
  return (
    <Box w={["100%", "100%", "50%"]}>
      <Carousel
        data={data}
        time={2000}
        width="100%"
        height="50vh"
        radius="10px"
        slideNumber={true}
        slideNumberStyle={slideNumberStyle}
        automatic={false}
        dots={true}
        slideImageFit="cover"
        thumbnails={true}
        style={{
          textAlign: "center",
          maxWidth: "100%",
          maxHeight: "50vh",
        }}
      />
    </Box>
  );
}

export default ImagesCarousel;
