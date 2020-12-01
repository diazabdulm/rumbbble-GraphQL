import placeholderImage from "assets/placeholder-image.png";

function PostImage({ thumbnailURL }) {
  const handleError = (event) => {
    event.target.src = placeholderImage;
  };

  return <img src={thumbnailURL} alt="" onError={handleError} />;
}

export default PostImage;
