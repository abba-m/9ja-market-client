import { gql } from "@apollo/client";

export const getAllPostsThumbnail = gql`
    query {
    posts {
      data {
        id
        attributes {
          title
          price
          location
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;