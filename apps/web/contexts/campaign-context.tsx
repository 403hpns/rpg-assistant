import { PropsWithChildren, createContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

type Campaign = {
  id: number;
  name: string;
  description: string;
};

type NewCampaign = Omit<Campaign, 'id'>;

type CampaignContext = {
  campaigns: Campaign[] | undefined;
  currentCampaign: Campaign | null;
  isLoading: boolean;
  error: Error | null;
  switchCampaign: (id: number) => void;
  createCampaign: (campaign: NewCampaign) => Promise<void>;
};

export const CampaignContext = createContext<CampaignContext | null>(null);

export function CampaignProvider({ children }: PropsWithChildren) {
  const [currentCampaignId, setCurrentCampaignId] = useState<number | null>(
    null
  );
  const queryClient = useQueryClient();

  const {
    data: campaigns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['game-campaigns'],
    queryFn: async () => {
      const response = await apiClient.get<Campaign[]>('/api/v1/campaigns');
      return response.data;
    },
  });

  const createCampaignMutation = useMutation<void, Error, NewCampaign>({
    mutationFn: async (newCampaign) => {
      await apiClient.post<Campaign>('/api/campaigns', newCampaign);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const currentCampaign =
    campaigns.find((c) => c.id === currentCampaignId) ?? null;

  const createCampaign = async (campaign: NewCampaign) => {
    await createCampaignMutation.mutateAsync(campaign);
  };

  const switchCampaign = (id: number) => setCurrentCampaignId(id);

  const contextValue = {
    campaigns,
    currentCampaign,
    isLoading,
    error,
    switchCampaign,
    createCampaign,
  };

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
}
