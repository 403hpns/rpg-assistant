import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config.dev';
import { CharactersModule } from './characters/characters.module';
import { GameCampaignsModule } from './campaigns/game-campaigns.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    CharactersModule,
    GameCampaignsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
