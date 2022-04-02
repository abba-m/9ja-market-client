import { useMediaQuery } from "@chakra-ui/react";
import AdContactCardBig from "./adContactCard.bigScreen";
import AdContactCardSmall from "./adContactCardSmall.smallScreen";

export default function AdContactCard(props) {
  const [isLargeScreen, isSmallScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  return (
    isLargeScreen ? <AdContactCardBig {...props} /> : <AdContactCardSmall {...props} />
  )
}
