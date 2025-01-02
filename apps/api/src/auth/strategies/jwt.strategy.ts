import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecretkey',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne({ id: payload.sub });
    if (!user) {
      throw new UnauthorizedException();
    }

    console.log(user);

    return {
      userId: payload.sub,
      name: payload.name,
      avatar: user.avatar,
      campaignsCount: user.campaigns?.length || 0,
      sessionsCount: user.sessions?.length || 0,
    };
  }
}
