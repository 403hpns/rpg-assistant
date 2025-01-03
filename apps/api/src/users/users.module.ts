import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { GameCampaign } from 'src/campaigns/game-campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, GameCampaign])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
