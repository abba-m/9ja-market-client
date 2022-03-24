import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

//import { useDispatch } from "react-redux";


export default function CreateClient() {
  // const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  //  const retryLink = new RetryLink({
  //    delay: {
  //     initial: 500,
  //     max: 60000,
  //     jitter: false,
  //   },
  //   attempts: {
  //     max: 5,
  //     retryIf: (error, _operation) => !!error
  //   }
  //  });

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      //TODO: handle errors properly
      //dispatch(setError("graphqlError", graphqlErrors))
      console.log("[Graphql error]: ", graphqlErrors);
    }

    if (networkError) {
      //TODO: handle errors properly
      //dispatch(setError("[networkError]", networkError))
      console.log("[Network error]: ", networkError);

    }
  });

  // const afterwareLink = new ApolloLink((operation, forward) => {
  //   forward(operation).map(response => {
  //     const context = operation.getContext();
  //     const authHeader = context.response.headers.get("Authorization");

  //     if (authHeader) {
  //       const token = authHeader.replace("Bearer ", "");
  //       localStorage.setItem("token", token)
  //     }

  //     return response;
  //   });
  // });

  const link = from([
    errorLink,
    //retryLink,
    //afterwareLink,
    createUploadLink({
      uri: `${process.env.REACT_APP_SERVER_URL}/graphql`, headers: token
        ? {
          Authorization: `Bearer ${token}`
        }
        : {}
    })
  ]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}