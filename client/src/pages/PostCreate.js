import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_POST } from "actions/postActions";

const FORM_FIELDS = [
  { id: 0, name: "title" },
  { id: 1, name: "description" },
  { id: 2, name: "repoURL" },
  { id: 3, name: "websiteURL" },
  { id: 4, name: "coverPhotoURL" },
];

function PostCreate({ history }) {
  const [createPost] = useMutation(CREATE_POST);
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    repoURL: "",
    websiteURL: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setPostDetails({ ...postDetails, [name]: value });
  };

  const handleSubmit = () => {
    createPost({ variables: postDetails });
    history.push("/");
  };

  const renderFields = FORM_FIELDS.map(({ id, name }) => (
    <input type="text" key={id} name={name} onChange={handleChange} />
  ));

  return (
    <form onSubmit={handleSubmit}>
      {renderFields}
      <button type="submit">Create New Post</button>
    </form>
  );
}

export default PostCreate;
