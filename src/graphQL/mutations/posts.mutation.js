import { gql } from "@apollo/client";

export const createUploadMutation = gql`
  mutation createUploadMutation ($files:  [Upload]!) {
    multipleUpload(files: $files) {
      data {
        id
      }
    }
  }
`

export const createPostMutation = gql`
  mutation createPostMutation (
    $title: String, 
    $description: String, 
    $price: Float, 
    $location: String, 
    $postedBy: ID,  
    $category: ENUM_POST_CATEGORY,
    $images: [ID]
    ) {
    createPost(
     data: {
       title: $title,
       description: $description,
       price: $price,
       location: $location,
       postedBy: $postedBy,
       category: $category,
       images: $images
      }
    ) {
      data {
        id 
        attributes {
          title
          images {
          data {
            id
          }
        }
        }
      }
    }
  }
`