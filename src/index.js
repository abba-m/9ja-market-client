import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { theme } from "./theme";
import { Provider } from "react-redux";
import configureStore from "store/root";
import CreateClient from "graphQL/clientConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = configureStore();
const client = CreateClient();

// React query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ApolloProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
