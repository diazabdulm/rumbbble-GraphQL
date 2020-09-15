import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { GET_POSTS, CREATE_POST } from "actions/postActions";

const FORM_FIELDS = [
  { id: 0, name: "title" },
  { id: 1, name: "description" },
  { id: 2, name: "repoURL" },
  { id: 3, name: "websiteURL" },
  { id: 4, name: "coverPhotoURL" },
];

function PostCreate({ history }) {
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });
  const [postDetails, setPostDetails] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setPostDetails({ ...postDetails, [name]: value });
  };

  const handleSubmit = () => {
    createPost({ variables: postDetails });
    history.push("/");
  };

  const renderFields = FORM_FIELDS.map(({ id, name }) => (
    <input required type="text" key={id} name={name} onChange={handleChange} />
  ));

  return (
    <form onSubmit={handleSubmit}>
      {renderFields}
      <button type="submit">Create New Post</button>
    </form>
  );
}

export default PostCreate;
