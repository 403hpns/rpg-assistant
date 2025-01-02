import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createInvitation(
    @Body() createInvitationDto: { campaignId: number; userId: number },
  ) {
    const { campaignId, userId } = createInvitationDto;
    const inviteCode = await this.invitationsService.generateInvite({
      campaignId,
      userId,
    });

    return { inviteCode };
  }

  @Post('join')
  @HttpCode(HttpStatus.OK)
  async joinCampaign(
    @Req() req,
    @Body() joinDto: { inviteCode: string; userId: string },
  ) {
    const { inviteCode, userId } = joinDto;

    const message = await this.invitationsService.joinCampaignWithInvite(
      inviteCode,
      req.user.userId,
    );

    return { message };
  }
}
