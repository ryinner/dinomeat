'use client';

import { useIntegrationInitialization } from '@/hooks/IntegrationHooks';
import { VK_COMMUNITY_MESSAGES_ID } from '@/services/lib/vk.service';

export default function TheIntegrationsInitializations () {
  useIntegrationInitialization()
  return <>
    <div id={VK_COMMUNITY_MESSAGES_ID} />
  </>
}