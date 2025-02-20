import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ context, location }) => {
    const user = await context.auth.ensureUserLoaded();

    if (!user) {
      throw redirect({
        to: '/auth/login',
        search: { redirect: location.href },
      });
    }

    if (!user.onboarding && location.pathname !== '/app/welcome') {
      throw redirect({
        to: '/app/welcome',
        search: { redirect: location.href },
      });
    }
  },
});
