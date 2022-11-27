import { Center } from "@chakra-ui/react";
import { DotLoader } from "react-spinners";

import fallback from "assets/images/fallback.png";

export const Loader = () => {
  return (
    <Center>
      <DotLoader color="#36d7b7" />
    </Center>
  );
};

export const ThumbnailFallback = () => {
  return (
    <img src={fallback} alt="post-placeholder" />
  );
};