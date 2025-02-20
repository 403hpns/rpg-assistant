import { apolloClient } from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

export default function ApolloClientProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
