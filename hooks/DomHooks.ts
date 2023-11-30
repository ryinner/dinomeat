import { RefObject, useEffect, useRef } from 'react';

export function useClickOutside <T extends HTMLElement>(callback: (e: Event) => void):  RefObject<T> {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const handler = (e: Event) => {
      const element = ref.current;
      if (element && e.target instanceof Node && !element.contains(e.target)) {
        callback(e);
      }
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [callback])

  return ref;
}
