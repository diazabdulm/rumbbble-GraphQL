import React from "react";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "actions/postActions";

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return null;
  if (error) throw Error(error.message);

  const renderPosts = data.posts.map((post) => (
    <article key={post.id}>
      <img src={post.coverPhotoURL} alt="" />
      <h1>{post.title}</h1>
      <div>
        <img src={post.author.avatarURL} alt="" />
        <p>{post.author.name}</p>
      </div>
      <button>Upvote</button>
      <span>{post.numLikes}</span>
    </article>
  ));

  return <main>{renderPosts}</main>;
}

export default PostList;
