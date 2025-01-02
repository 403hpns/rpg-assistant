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

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    CharactersModule,
    GameCampaignsModule,
    GameSessionsModule,
    AuthModule,
    InvitationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
