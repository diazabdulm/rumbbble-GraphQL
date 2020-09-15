import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_COMMENT, GET_COMMENTS } from "actions/commentActions";

function CommentCreate({ post }) {
  const [content, setContent] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { post } }],
  });

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment({ variables: { post, content } });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleChange}></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentCreate;
