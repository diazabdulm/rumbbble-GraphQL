import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import { makeStyles, Avatar, Paper, TextField } from "@material-ui/core";

import withRequireAuth from "components/RequireAuth";
import { CREATE_POST, GET_POSTS } from "actions/postActions";

const GET_USER = gql`
  query GetUser {
    user {
      name
      avatarURL
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function PostCreate({ history }) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_USER);

  const [postDetails, setPostDetails] = useState({});

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  if (loading) return null;
  if (error) return;

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

  return (
    <Paper onSubmit={handleSubmit} className={classes.root}>
      <Avatar src />
      <TextField onChange={handleChange} />
    </Paper>
  );
}

export default withRequireAuth(PostCreate);
