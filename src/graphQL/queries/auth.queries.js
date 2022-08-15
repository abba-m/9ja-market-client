import { gql } from "@apollo/client";

export const getAuthenticatedUser = gql`
  query {
    me {
      id
      username
      email
      confirmed
      blocked
      role {
        id
        name
      }
    }
  }
`;
