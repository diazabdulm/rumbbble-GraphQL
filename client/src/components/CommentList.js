import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "actions/commentActions";

function CommentList({ post }) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { post },
  });

  if (loading) return null;
  if (error) throw Error(error.message);

  const renderComments = data.comments.map(({ id, content, author }) => (
    <section key={id}>
      <p>{content}</p>
      <p>{author.name}</p>
      <img src={author.avatarURL} alt="" />
    </section>
  ));

  return <section>{renderComments}</section>;
}

export default CommentList;
