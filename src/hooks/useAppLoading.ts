import { useEffect, useState } from "react";

const DEFAULT_LOADING_DURATION = 3000;
export function useAppLoading(duration = DEFAULT_LOADING_DURATION): boolean {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): (() => void) => {
    const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
      setIsLoading(false);
    }, duration);

    return (): void => clearTimeout(timer);
  }, [duration]);

  return isLoading;
}
