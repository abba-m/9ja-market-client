import { gql } from "@apollo/client";

export const getCurrentUser = gql`
  query getCurrentUser($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          fullName
          avatar {
            data {
              id
              attributes {
                url
                previewUrl
              }
            }
          }
        }
      }
    }
  }
`;
export const getDummyUserAvatar = gql`
  query {
    dummyMedia(id: 1) {
      data {
        id
        attributes {
          media {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
        }
      }
    }
  }
`;

// export const getUserProfile = gql`

// `
