import { useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";

import PostListItem from "components/PostListItem";
import { GET_POSTS } from "actions/postActions";

function PostList() {
  const infiniteLoadingElement = useRef(null);
  const { loading, error, data } = useQuery(GET_POSTS);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // alert("boogie man");
    });
  }, []);

  if (loading) return null;
  if (error) throw Error(error.message);

  const handleScroll = (event) => {
    // alert("scrolled");
  };

  const renderPosts = data.posts.map((post) => (
    <PostListItem key={post.id} {...post} />
  ));

  return (
    <main>
      {renderPosts}
      <div ref={infiniteLoadingElement} />
    </main>
  );
}

export default PostList;
