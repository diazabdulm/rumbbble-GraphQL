import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { LIKE_POST } from "actions/likeActions";

function PostListItem(props) {
  const [likePost] = useMutation(LIKE_POST);

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
      <button onClick={handleClick}>Like</button>
      <span>{props.numLikes}</span>
    </article>
  );
}

export default PostListItem;
