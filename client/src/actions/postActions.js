import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GET_POSTS($lastPostID: ID) {
    posts(lastPostID: $lastPostID) {
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
      repositoryURL
      projectURL
      thumbnail
      numLikes
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $description: String!
    $repositoryURL: String!
    $projectURL: String!
    $thumbnail: Upload!
  ) {
    createPost(
      title: $title
      description: $description
      repositoryURL: $repositoryURL
      projectURL: $projectURL
      thumbnail: $thumbnail
    ) {
      id
    }
  }
`;
