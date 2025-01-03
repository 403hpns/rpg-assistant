import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { UsersModule } from 'src/users/users.module';
import { OnboardingService } from './onboarding.service';

@Module({
  imports: [UsersModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}
