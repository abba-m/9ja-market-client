import {
  Box,
  Image,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import heroesMain from "assets/images/heroesMain.svg";
import smallHeroesMain from "assets/images/smallHeroesMain.png";
import heroesBR from "assets/images/heroesBR.svg";
import heroesTR from "assets/images/heroesTR.svg";

export default function HeroesAdGrid() {
  const adDisplay = useBreakpointValue({ baseline: "none", md: "flex" });
  const [isSmallScreen] = useMediaQuery("(max-width: 480px)");
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      minW="100%"
      justifyContent="center"
      gap="1rem"
      sx={{
        "@media only screen and (max-width: 480px)": {
          height: "4rem",
        },
        "@media only screen and (max-width: 768px)": {
          height: "15rem",
          mt: "3",
        },
        "@media only screen and (min-width: 768px)": {
          mt: "3",
        },
      }}
      h="25rem"
    >
      <Image
        src={isSmallScreen ? smallHeroesMain : heroesMain}
        alt="Ad 1"
        maxH="25rem"
        viewBox="1 22 100 100"
      />
      <Box
        display={adDisplay}
        flexDirection="column"
        gap="0.5rem"
        sx={{
          "@media only screen and (max-width: 480px)": {
            display: "none",
          },
        }}
      >
        <Image src={heroesTR} alt="Ad 2" maxH="calc(24.5rem / 2)" />
        <Image src={heroesBR} alt="Ad 3" maxH="calc(24.5rem / 2)" />
      </Box>
    </Box>
  );
}
