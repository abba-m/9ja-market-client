import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./buttonStyles";

export const theme = extendTheme({
  colors: {
    primary: "#00CC88",
    secondary: "#2C3E50",
  },
  components: {
    Button,
  },
});
