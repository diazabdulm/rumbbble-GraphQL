import React from "react";
import { useMutation } from "@apollo/client";

import { LIKE_POST } from "actions/likeActions";

function PostListItem(props) {
  const [likePost] = useMutation(LIKE_POST);

  const handleClick = () => {
    likePost({ variables: { post: props.id } });
  };

  return (
    <article>
      <img src={props.coverPhotoURL} alt="" />
      <h1>{props.title}</h1>
      <div>
        <img src={props.author.avatarURL} alt="" />
        <p>{props.author.name}</p>
      </div>
      <button onClick={handleClick}>Like</button>
      <span>{props.numLikes}</span>
    </article>
  );
}

export default PostListItem;
