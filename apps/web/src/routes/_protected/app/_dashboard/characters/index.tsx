import { CharacterCard } from '@/components/character-card';
import { Button } from '@/components/ui/button';
import { useCampaigns } from '@/hooks/use-campaigns';
import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_protected/app/_dashboard/characters/')({
  component: RouteComponent,
});

type Character = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
};

function RouteComponent() {
  const { currentCampaign } = useCampaigns();
  const { t } = useTranslation();

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
    <div className="container mx-auto flex flex-col gap-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/app/characters/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            {t('app.characters.index.newCharacterBtn')}
          </Link>
        </Button>
      </div>

      {JSON.stringify(campaignCharacters, null, 2)}

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
