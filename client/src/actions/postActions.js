import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      coverPhoto
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
      websiteURL
      coverPhoto
      numLikes
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $description: String!
    $repoURL: String!
    $websiteURL: String!
    $coverPhoto: Upload!
  ) {
    createPost(
      title: $title
      description: $description
      repoURL: $repoURL
      websiteURL: $websiteURL
      coverPhoto: $coverPhoto
    ) {
      id
    }
  }
`;
