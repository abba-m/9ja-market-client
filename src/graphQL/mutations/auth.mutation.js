import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation login($identifier: String!, $password: String!){
    login(input: { identifier: $identifier, password: $password }){
        jwt
        user {
          id
          username
          email
          fullName
        }
    }
  }
`
export const createNewUserMutation = gql`
  mutation createNewUser($username: String!, $fullName: String!, $email: String!, $password: String!) {
  register(input: {username: $username, fullName: $fullName, email: $email, password: $password}){
    user {
      username
      email
    }
  }
}
`