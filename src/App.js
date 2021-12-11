import UserForm from "components/form";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "theme";

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div className="App">
        <UserForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
