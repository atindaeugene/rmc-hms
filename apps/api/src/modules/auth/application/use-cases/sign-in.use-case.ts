import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { USER_AUTH_REPOSITORY, UserAuthRepository } from '../ports/user-auth.repository';

export type SignInCommand = { email: string; password: string };

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(USER_AUTH_REPOSITORY) private readonly users: UserAuthRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async execute(command: SignInCommand): Promise<{ accessToken: string; refreshToken: string }> {
    const record = await this.users.findByEmail(command.email.toLowerCase().trim());
    if (!record?.isActive) throw new UnauthorizedException('Invalid credentials');

    const matches = await bcrypt.compare(command.password, record.passwordHash);
    if (!matches) throw new UnauthorizedException('Invalid credentials');

    const user = record.user.toClaims();
    const payload = { sub: user.id, email: user.email, branchId: user.branchId, roles: user.roles };

    return {
      accessToken: await this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
      }),
      refreshToken: await this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
      }),
    };
  }
}
