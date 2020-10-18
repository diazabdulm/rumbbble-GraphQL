import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import withRequireAuth from "./RequireAuth";
import { CREATE_POST, GET_POSTS } from "actions/postActions";

const FORM_TEXT_FIELDS = [
  { id: 0, name: "title" },
  { id: 1, name: "description" },
  { id: 2, name: "repositoryURL" },
  { id: 3, name: "projectURL" },
];

function PostCreate({ history }) {
  const [thumbnail, setthumbnail] = useState();
  const [postDetails, setPostDetails] = useState({});
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => history.push("/"),
  });

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setPostDetails({ ...postDetails, [name]: value });
  };

  const handleFileChange = (event) => {
    const {
      target: { validity },
    } = event;
    if (!validity.valid) throw Error("file not valid");
    setthumbnail(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({ variables: { ...postDetails, thumbnail } });
  };

  const renderTextFields = FORM_TEXT_FIELDS.map(({ id, name }) => (
    <input required type="text" key={id} name={name} onChange={handleChange} />
  ));

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      {renderTextFields}
      <input
        required
        type="file"
        name="thumbnail"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
      />
      <button type="submit">Create New Post</button>
    </form>
  );
}

export default withRequireAuth(PostCreate);
