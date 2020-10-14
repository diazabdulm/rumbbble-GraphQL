import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { GET_USER } from "actions/userActions";
import { LIKE_POST } from "actions/likeActions";

function PostListItem(props) {
  const { loading, error, data } = useQuery(GET_USER);
  const [likePost] = useMutation(LIKE_POST);

  if (loading) return "Loading...";
  if (error) throw Error(error.message);

  const handleClick = () => {
    likePost({
      variables: { post: props.id },
      optimisticResponse: {
        __typename: "Mutation",
        createLike: {
          post: {
            __typename: "Post",
            id: props.id,
            numLikes: props.numLikes + 1,
          },
        },
      },
    });
  };

  const renderLikeButton = data.user && (
    <button onClick={handleClick}>Like</button>
  );

  return (
    <article>
      <Link to={`/posts/${props.id}`}>
        <img src={props.coverPhoto} alt="" />
        <h1>{props.title}</h1>
        <div>
          <img src={props.author.avatarURL} alt="" />
          <p>{props.author.name}</p>
        </div>
      </Link>
      {renderLikeButton}
      <span>{props.numLikes}</span>
    </article>
  );
}

export default PostListItem;
