import { useAuth } from '@/hooks/use-auth';
import apiClient from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

type Campaign = {
  id: number;
  name: string;
  description: string;
};

type NewCampaign = Omit<Campaign, 'id'>;

type CampaignContext = {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  isLoading: boolean;
  error: Error | null;
  switchCampaign: (id: number) => void;
  createCampaign: (campaign: NewCampaign) => Promise<void>;
};

export const CampaignContext = createContext<CampaignContext | null>(null);

const cacheKey = 'gameCampaign:current';

export function CampaignProvider({ children }: PropsWithChildren) {
  const [currentCampaignId, setCurrentCampaignId] = useState<number | null>(
    null
  );
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const router = useRouter();

  const {
    data: campaigns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['game-campaigns'],
    queryFn: async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 5000);

      try {
        const response = await apiClient.get(
          `/api/v1/users/${user?.userId}/campaigns`,
          {
            signal: controller.signal,
          }
        );
        return response.data as Campaign[];
      } finally {
        clearTimeout(timeoutId);
      }
    },
    enabled: !!user?.userId,
  });

  const createCampaignMutation = useMutation<void, Error, NewCampaign>({
    mutationFn: async (newCampaign) => {
      await apiClient.post<Campaign>(
        `/api/v1/${user?.userId}/campaigns`,
        newCampaign
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['game-campaigns'] }),
  });

  const isValidCampaign = (id: number) => {
    return campaigns.find((c) => c.id === id);
  };

  const currentCampaign = currentCampaignId
    ? campaigns.find((c) => c.id === currentCampaignId)
    : campaigns[0];

  const createCampaign = async (campaign: NewCampaign) => {
    await createCampaignMutation.mutateAsync(campaign);
  };

  const switchCampaign = (id: number) => {
    if (!isValidCampaign(id)) {
      return;
    }

    setCurrentCampaignId(id);
    localStorage.setItem(cacheKey, JSON.stringify(id));
  };

  // Retrieve chosen campaign from local storage
  useEffect(() => {
    if (!user || !campaigns || !campaigns.length) {
      return;
    }

    const campaign = localStorage.getItem(cacheKey);
    if (campaign == null || campaign === '') {
      return;
    }

    // Forbidden campaign
    if (!isValidCampaign(+campaign)) {
      const firstValidCampaign = campaigns[0]?.id;

      if (!firstValidCampaign) {
        router.navigate({ to: '/app/campaigns/new' });
        return;
      }

      localStorage.setItem(cacheKey, JSON.stringify(firstValidCampaign));
      setCurrentCampaignId(+firstValidCampaign);
      return;
    }

    setCurrentCampaignId(+campaign);
  }, [campaigns, user]);

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
