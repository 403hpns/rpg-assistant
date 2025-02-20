import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/app/welcome/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <OnboardingWizard username="403hpns" />
    </div>
  );
}
