import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export function usePropsState<T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    setState(() => initialValue);
  }, [initialValue]);

  return [state, setState];
}

export function useLocalStorageState<T>(initialValue: T, name: string): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);
  const hasPulled = useRef(false);

  const setStorageValue: typeof setState = useCallback((e) => {
    if (e instanceof Function) {
      e = e(state);
    }
    localStorage.setItem(name, JSON.stringify(e));
    setState(e);
  }, [name, state]);

  useEffect(() => {
    if (!hasPulled.current) {
      try {
        setState(JSON.parse(localStorage.getItem(name) ?? ''));
      } catch {
        setState(initialValue);
      }
      hasPulled.current = true;
    }
  }, [initialValue, name]);

  return [state, setStorageValue];
}