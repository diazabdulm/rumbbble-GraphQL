import { useQuery } from "@apollo/client";

import PostListItem from "components/PostListItem";
import ScrollToBottom from "./ScrollToBottom";

import { GET_POSTS } from "actions/postActions";

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return null;
  if (error) throw Error(error.message);

  const loadMorePosts = () => {
    console.log("loading...");
  };

  const renderPosts = data.posts.map((post) => (
    <PostListItem key={post.id} {...post} />
  ));

  return (
    <main>
      {renderPosts}
      <ScrollToBottom callback={loadMorePosts} />
    </main>
  );
}

export default PostList;
