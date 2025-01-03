import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type Cache } from 'cache-manager';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getOnboardingStatus(userId: number) {
    const cacheKey = `onboarding:${userId}`;

    let status = await this.cacheManager.get(cacheKey);
    if (status == undefined) {
      const user = await this.usersService.findOne({ id: userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      status = user.onboarding;
      await this.cacheManager.set(cacheKey, user.onboarding);
    }

    console.log('Onboarding status: ', status);
    return { hasOnboarding: status };
  }

  async setOnboardingStatus(
    userId: number,
    status: boolean,
    answers: string[],
  ) {
    const cacheKey = `onboarding:${userId}`;
    await this.cacheManager.set(cacheKey, true);

    await this.usersService.update(userId, {
      onboarding: status,
      onboardingAnswers: answers,
    });

    return { success: true, message: 'Onboarding status updated' };
  }
}
