import { useCallback } from "react";
import { useQuery } from "@apollo/client";

import PostListItem from "components/PostListItem";
import VisibilityDetect from "components/VisibilityDetect";

import { GET_POSTS } from "actions/postActions";

function PostList() {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS);

  const loadMorePosts = useCallback(() => {
    const { posts } = data;
    if (!posts.length) return;

    const { id } = posts[posts.length - 1];
    fetchMore({ variables: { lastPostID: id } });
  }, [data, fetchMore]);

  if (loading) return null;
  if (error) throw Error(error.message);

  const renderPosts = data.posts.map((post) => (
    <PostListItem key={post.id} {...post} />
  ));

  return (
    <main>
      {renderPosts}
      <VisibilityDetect callback={loadMorePosts} />
    </main>
  );
}

export default PostList;
