import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AuthProvider } from './contexts/auth-context';
import { useAuth } from './hooks/use-auth';
import ApolloClientProvider from './providers/apollo-provider';
import { routeTree } from './routeTree.gen';

import '@/index.css';
import '@/utils/i18n';

import { CampaignProvider } from './contexts/campaign-context';
import { ThemeProvider } from './providers/theme-provider';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  context: { auth: undefined! },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloClientProvider>
        <AuthProvider>
          <CampaignProvider>
            <ThemeProvider>
              <RouterWrapper />
            </ThemeProvider>
          </CampaignProvider>
        </AuthProvider>
      </ApolloClientProvider>
    </QueryClientProvider>
  );
}

function RouterWrapper() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
