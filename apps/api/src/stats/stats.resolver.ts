import { Query, Resolver } from '@nestjs/graphql';
import { Stat } from './models/stats.model';

@Resolver(() => Stat)
export class StatsResolver {
  @Query(() => Stat)
  async stat() {
    return {
      id: '1',
      name: 'test',
    };
  }
}
