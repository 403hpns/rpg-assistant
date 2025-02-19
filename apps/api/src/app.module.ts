import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GameCampaignsModule } from './campaigns/game-campaigns.module';
import { CharactersModule } from './characters/characters.module';
import { cacheConfig } from './config/cache.config';
import { dbConfig } from './config/db.config.dev';
import { graphqlConfig } from './config/graphql.config';
import { GameSessionsModule } from './game_sessions/game-sessions.module';
import { InvitationsModule } from './invitations/invitations.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { StatsModule } from './stats/stats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(graphqlConfig),
    TypeOrmModule.forRoot(dbConfig),
    CacheModule.registerAsync(cacheConfig),
    UsersModule,
    CharactersModule,
    GameCampaignsModule,
    GameSessionsModule,
    AuthModule,
    InvitationsModule,
    StatsModule,
    OnboardingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
