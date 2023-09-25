import * as VKService from '@/services/lib/vk.service';
import { useEffect, useRef } from 'react';

export function useIntegrationInitialization () {
  const isInitialize = useRef(false);

  useEffect(() => {
    if (!isInitialize.current) {
      VKService.init();
      VKService.createCommunityMessageWidget()
      isInitialize.current = true;
    }
  }, [])
}
