import { Toast } from '@/@types/private';
import { useCallback, useEffect, useRef } from 'react';
import { setTimeout } from 'timers/promises';

export default function Toast ({ toast, onRemove }: Props) {
  const isRemoving = useRef(false);

  const removeHandler = useCallback(() => {
    onRemove(toast)
  }, [toast, onRemove]);

  useEffect(() => {
    if (toast.timeout && !isRemoving.current) {
      isRemoving.current = true;
      setTimeout(toast.timeout, () => {
        removeHandler();
      });
    }
  }, [toast, removeHandler]);

  return <article>
    { toast.children }
  </article>
}

interface Props {
  toast: Toast;
  onRemove: (e: Toast) => void;
}