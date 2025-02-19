import { useContext } from 'react';
import { CampaignContext } from '@/contexts/campaign-context';

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
}
