import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitations.entity';
import { GameCampaign } from 'src/campaigns/game-campaign.entity';
import { User } from 'src/users/user.entity';
import { GameCampaignsModule } from 'src/campaigns/game-campaigns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation, User, GameCampaign]),
    GameCampaignsModule,
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService],
})
export class InvitationsModule {}
