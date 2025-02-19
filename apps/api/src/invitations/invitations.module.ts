import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCampaign } from 'src/campaigns/entities/game-campaign.entity';
import { GameCampaignsModule } from 'src/campaigns/game-campaigns.module';
import { User } from 'src/users/user.entity';
import { InvitationsController } from './invitations.controller';
import { Invitation } from './invitations.entity';
import { InvitationsService } from './invitations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation, User, GameCampaign]),
    GameCampaignsModule,
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService],
})
export class InvitationsModule {}
