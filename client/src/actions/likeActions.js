import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation LikePost($post: ID!) {
    createLike(post: $post) {
      post {
        id
        numLikes
      }
    }
  }
`;
