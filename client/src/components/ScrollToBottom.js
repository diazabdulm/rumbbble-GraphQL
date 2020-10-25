import { useEffect, useRef } from "react";

function ScrollToBottom({ callback }) {
  const bottomDiv = useRef(null);

  useEffect(() => {
    const handleIntersection = ([{ isIntersecting }]) => {
      isIntersecting && callback();
    };

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(bottomDiv.current);

    return () => observer.disconnect();
  }, [callback]);

  return <div ref={bottomDiv} />;
}

export default ScrollToBottom;
