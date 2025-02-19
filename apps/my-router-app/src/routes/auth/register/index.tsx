import { RegisterForm } from '@/components/auth/register-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen content-center">
      <RegisterForm />
    </div>
  );
}
