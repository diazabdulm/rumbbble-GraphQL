import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      thumbnail
      numLikes
      author {
        id
        name
        avatarURL
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      repoURL
      demoURL
      thumbnail
      numLikes
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $description: String!
    $repoURL: String!
    $demoURL: String!
    $thumbnail: Upload!
  ) {
    createPost(
      title: $title
      description: $description
      repoURL: $repoURL
      demoURL: $demoURL
      thumbnail: $thumbnail
    ) {
      id
    }
  }
`;
