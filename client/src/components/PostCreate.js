import React, { useState, Fragment } from "react";
import { useMutation } from "@apollo/client";

import withRequireAuth from "./RequireAuth";
import { CREATE_POST, GET_POSTS } from "actions/postActions";

const FORM_FIELDS = [
  { id: 0, name: "title" },
  { id: 1, name: "description" },
  { id: 2, name: "repositoryURL" },
  { id: 3, name: "projectURL" },
];

function PostCreate({ history }) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({ variables: { ...postDetails } });
  };

  const renderFields = FORM_FIELDS.map(({ id, name }) => (
    <Fragment>
      <label for={name}>{name}</label>
      <input
        required
        type="text"
        key={id}
        id={name}
        name={name}
        onChange={handleChange}
      />
    </Fragment>
  ));

  return (
    <form onSubmit={handleSubmit}>
      {renderFields}
      <button type="submit">Create New Post</button>
    </form>
  );
}

export default withRequireAuth(PostCreate);
