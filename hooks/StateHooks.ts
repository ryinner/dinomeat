import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function usePropsState<T>(props: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  return [state, setState];
}
