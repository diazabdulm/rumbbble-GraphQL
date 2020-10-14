import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_USER } from "actions/userActions";
import { CREATE_COMMENT, GET_COMMENTS } from "actions/commentActions";

function CommentCreate({ post }) {
  const [content, setContent] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { post } }],
  });

  const { loading, error, data } = useQuery(GET_USER);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment({ variables: { post, content } });
    setContent("");
  };

  if (loading) return "Loading...";
  if (error) throw Error(error.message);
  if (!data.user) return null;

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleChange}></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentCreate;
