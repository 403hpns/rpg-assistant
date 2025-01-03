import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard';
import { getServerSession } from '@/lib/auth';

export default async function OnboardingPage() {
  const session = await getServerSession();

  return <OnboardingWizard username={session.name} />;
}
