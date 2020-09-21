import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import withRequireAuth from "./RequireAuth";
import { CREATE_POST, GET_POSTS } from "actions/postActions";

const FORM_TEXT_FIELDS = [
  { id: 0, name: "title" },
  { id: 1, name: "description" },
  { id: 2, name: "repoURL" },
  { id: 3, name: "websiteURL" },
];

function PostCreate(props) {
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });
  const [file, setFile] = useState();
  const [postDetails, setPostDetails] = useState({});

  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setPostDetails({ ...postDetails, [name]: value });
  };

  const handleFileChange = (event) => {
    const [fileDetails] = event.target.files;
    // console.log(fileDetails);
    console.log('event.target.files', event.target.files)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({ variables: postDetails });
    // history.push("/");
  };

  const renderTextFields = FORM_TEXT_FIELDS.map(({ id, name }) => (
    <input required type="text" key={id} name={name} onChange={handleChange} />
  ));

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      {renderTextFields}
      <input required type="file" name="coverPhoto" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Create New Post</button>
    </form>
  );
}

export default withRequireAuth(PostCreate);
