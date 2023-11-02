import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export function usePropsState<T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    setState(() => initialValue);
  }, [initialValue]);

  return [state, setState];
}
