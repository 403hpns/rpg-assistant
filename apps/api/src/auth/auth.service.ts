import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string) {
    console.log('Validate user: 1  ', name, password);

    const user = await this.usersService.findOneByName(name);

    console.log('Validate user: 2  ', user);

    if (!user.success || !user.data) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.data.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user.data;
    return userWithoutPassword;
  }

  async validateUserAndGenerateToken(
    name: string,
    password: string,
  ): Promise<string> {
    const user = await this.validateUser(name, password);

    console.log('Validate user and generate token: ', user);

    const payload = { sub: user.id, username: user.email };
    return this.jwtService.sign(payload);
  }

  async decodeToken(token: string) {
    return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
  }

  async registerUser(registerDto: {
    name: string;
    email: string;
    password: string;
  }) {
    const { name, email, password } = registerDto;

    const existingUser = await this.usersService.findOneByName(name);
    if (existingUser.success) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
