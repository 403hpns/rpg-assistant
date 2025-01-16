import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard';
import { getServerSession } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import React from 'react';

export default async function OnboardingPage() {
  const session = await getServerSession();

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader2 size={80} className="animate-spin" />
        </div>
      }>
      <OnboardingWizard username={session.name} />
    </React.Suspense>
  );
}
