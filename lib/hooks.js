
import { useEffect, useState } from "react";

/**
 * A really common need is to get the current size of the browser window. This hook returns an
 * object containing the window's width and height. If executed server-side (no window object) the
 * value of width and height will be undefined.
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
