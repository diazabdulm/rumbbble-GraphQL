import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComment($post: ID!) {
    comments(post: $post) {
      id
      content
      author {
        id
        name
        avatarURL
      }
    }
  }
`;
