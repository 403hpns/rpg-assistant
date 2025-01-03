import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { useAuth } from './use-auth';
import { useEffect, useState } from 'react';

type CampaignList = {
  id: number;
  name: string;
  description: string;
}[];

export function useCampaigns() {
  const [currentCampaign, setCurrentCampaign] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const pickedCampaign = localStorage.getItem('campaign:current');
    if (!pickedCampaign) {
      return;
    }

    setCurrentCampaign(pickedCampaign);
  }, []);

  const switchCurrentCampaign = (name: string) => {
    setCurrentCampaign(name);
    localStorage.setItem('campaign:current', name);
  };

  const query = useQuery<CampaignList, Error>({
    queryKey: ['game-campaigns'],
    queryFn: async () => {
      if (!user?.userId) {
        throw new Error('User not authenticated');
      }
      const result = await apiClient.get(
        `/api/v1/users/${user.userId}/campaigns`
      );
      return result.data as CampaignList;
    },
    enabled: !!user?.userId,
  });

  return {
    isPending: query.isPending,
    data: query.data,
    currentCampaign,
    switchCurrentCampaign,
  };
}
