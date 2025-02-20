import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  playground: false,
  autoSchemaFile: 'src/schema.gql',
  sortSchema: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
};
