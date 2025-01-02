import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

type CampaignList = {
  id: number;
  name: string;
  description: string;
}[];

export function useCampaigns() {
  return useQuery({
    queryKey: ['game-campaigns'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/v1/campaigns');
      return data.data as CampaignList;
    },
  });
}
