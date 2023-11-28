import { LegacyRef, useEffect, useRef } from 'react';

export function useClickOutside <T>(callback: (e: Event) => void): LegacyRef<T> {
  const ref = useRef<HTMLElement>();
  
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

  return ref as LegacyRef<T>;
}
