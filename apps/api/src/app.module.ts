import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config.dev';
import { CharactersModule } from './characters/characters.module';
import { GameCampaignsModule } from './campaigns/game-campaigns.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GameSessionsModule } from './game_sessions/game-sessions.module';
import { InvitationsModule } from './invitations/invitations.module';
import { StatsModule } from './stats/stats.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { OnboardingModule } from './onboarding/onboarding.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000,
        };
      },
    }),
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
