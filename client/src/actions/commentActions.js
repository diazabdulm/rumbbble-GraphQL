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

export const CREATE_COMMENT = gql`
  mutation CreateComment($content: String!, $post: ID!) {
    createComment(content: $content, post: $post) {
      id
    }
  }
`;
