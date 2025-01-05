'use client';

import { useCampaigns } from '@/hooks/use-campaigns';
import { notFound, useParams } from 'next/navigation';

export default function Page() {
  const { slug } = useParams();
  const { campaigns } = useCampaigns();

  if (!slug) {
    return null;
  }

  const campaignData = campaigns.find((c) => c.id === +slug);

  if (!campaignData) {
    return notFound();
  }

  return (
    <div>
      <h2>{campaignData?.name}</h2>
    </div>
  );
}
