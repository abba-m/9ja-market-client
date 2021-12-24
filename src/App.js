import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "theme";

import UserForm from "components/form";
import ListComponent from "components/list";

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div className="App">
        <UserForm />
        <ListComponent />
      </div>
    </ChakraProvider>
  );
}

export default App;
