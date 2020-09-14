import React from "react";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "actions/postActions";
import PostListItem from "components/PostListItem";

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return null;
  if (error) throw Error(error.message);

  const renderPosts = data.posts.map((post) => (
    <PostListItem key={post.id} {...post} />
  ));

  return <main>{renderPosts}</main>;
}

export default PostList;
