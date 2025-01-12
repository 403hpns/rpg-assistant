'use client';
import { CharacterCard } from '@/components/character-card';
import { Button } from '@/components/ui/button';
import { useCampaigns } from '@/hooks/use-campaigns';
import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

type Character = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
};

export default function CharacterPage() {
  const { currentCampaign } = useCampaigns();

  const { data: campaignCharacters = [], isPending } = useQuery({
    queryKey: ['game-campaign-characters'],
    queryFn: async () => {
      if (!currentCampaign) return;

      try {
        const { data } = await apiClient.get(
          `/api/v1/campaigns/${currentCampaign.id}/characters`
        );

        return data as Character[];
      } catch (error) {
        //
      }
    },
    enabled: !!currentCampaign,
  });

  return (
    <div className="container mx-auto flex flex-col gap-4 py-6">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="characters/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Nowa postać
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-6">
        {!isPending &&
          campaignCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              fullName={`${character.firstName} ${character.middleName} ${character.lastName}`}
              description={character.description}
            />
          ))}
      </div>
    </div>
  );
}
