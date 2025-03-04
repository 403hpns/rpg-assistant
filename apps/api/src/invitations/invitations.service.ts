import {
  BadRequestException,
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { GameCampaign } from 'src/campaigns/entities/game-campaign.entity';
import { GameCampaignService } from 'src/campaigns/game-campaigns.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { GenerateInviteDto } from './dtos/generate-invite.dto';
import { Invitation } from './invitations.entity';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly gameCampaignsService: GameCampaignService,
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(GameCampaign)
    private campaignRepository: Repository<GameCampaign>,
  ) {}

  async generateInvite(inviteData: GenerateInviteDto) {
    const inviteCode = randomUUID();

    const invitation = this.invitationRepository.create({
      code: inviteCode,
      userId: inviteData.userId,
      campaignId: inviteData.campaignId,
      expiresAt: new Date(new Date().getTime() + 3600000), // 1h
    });

    await this.invitationRepository.save(invitation);
    return inviteCode;
  }

  async joinCampaignWithInvite(inviteCode: string, userId: string) {
    const invitation = await this.invitationRepository.findOne({
      where: { code: inviteCode },
    });

    if (!invitation) {
      throw new BadRequestException('Invalid invitation code');
    }

    if (new Date() > invitation.expiresAt) {
      throw new GoneException('Invitation code has expired');
    }

    const user = await this.userRepository.findOne({ where: { id: +userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const campaign = await this.campaignRepository.findOne({
      where: { id: invitation.campaignId },
      relations: ['users'],
    });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const isAlreadyInCampaign = campaign.users.some(
      (user) => user.id === +userId,
    );
    if (isAlreadyInCampaign) {
      throw new ForbiddenException("You're already in this campaign");
    }

    this.gameCampaignsService.addUserToCampaign({
      userId: +userId,
      campaignId: campaign.id,
    });

    await this.campaignRepository.save(campaign);

    return { message: 'Successfully joined the campaign' };
  }
}
