import { Box, ChakraProvider, ChakreProvider } from "@chakra-ui/react";
import theme from "theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  chakra: { theme: theme},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// export const decorators = [ 
//   (story) => (
//     <ChakraProvider resetCSS theme={theme}>
//       <Box m="3">
//         {story}
//       </Box>
//     </ChakraProvider>
//   ),
// ]