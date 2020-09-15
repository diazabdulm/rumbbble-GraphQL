import React from "react";
import { useQuery } from "@apollo/client";

import CommentList from "./CommentList";
import { GET_POST } from "actions/postActions";

function PostDetail({ match }) {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: match.params.id },
  });

  if (loading) return null;
  if (error) throw Error(error.message);

  const { post } = data;

  return (
    <article>
      <img src={post.coverPhotoURL} alt="" />
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <a href={post.repoURL}>Visit repository</a>
      <a href={post.websiteURL}>Visit website</a>
      <CommentList post={post.id} />
    </article>
  );
}

export default PostDetail;
