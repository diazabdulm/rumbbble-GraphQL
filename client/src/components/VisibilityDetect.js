import { useEffect, useRef } from "react";

function VisibilityDetect({ callback }) {
  const element = useRef(null);

  useEffect(() => {
    const handleIntersection = ([{ isIntersecting }]) => {
      isIntersecting && callback();
    };

    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(element.current);

    return () => observer.disconnect();
  }, [callback]);

  return <div ref={element} />;
}

export default VisibilityDetect;
