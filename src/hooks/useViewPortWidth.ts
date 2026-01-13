import { useEffect, useState } from "react";

export function useViewportWidth(debounceMs = 150) {
  const [width, setWidth] = useState(0);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let timeout: number;

    const handleResize = () => {
      setIsResizing(true);
      setWidth(window.innerWidth);

      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        setIsResizing(false);
      }, debounceMs);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceMs]);

  return { width, isResizing };
}
