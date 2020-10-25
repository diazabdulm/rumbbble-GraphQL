import { useEffect, useState } from "react";
import placeholderImage from "assets/placeholder-image.png";

function PostImage({ thumbnailURL }) {
  const [sourceURL, setSourceURL] = useState("");

  useEffect(() => {
    setSourceURL(thumbnailURL);
  }, []);

  const handleError = () => {
    setSourceURL(placeholderImage);
  };

  return <img src={sourceURL} alt="" onError={handleError} />;
}

export default PostImage;
