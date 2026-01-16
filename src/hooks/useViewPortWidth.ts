import { useEffect, useState } from "react";

interface ViewportSize {
  width: number;
  isResizing: boolean;
}

export function useViewportWidth(debounceMs: number = 150): ViewportSize {
  const [width, setWidth] = useState<number>(0);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  useEffect((): (() => void) => {
    if (typeof window === "undefined") return () => {};

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = (): void => {
      setIsResizing(true);
      setWidth(window.innerWidth);

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsResizing(false);
      }, debounceMs);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceMs]);

  return { width, isResizing };
}
