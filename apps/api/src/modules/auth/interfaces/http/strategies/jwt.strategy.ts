import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleName } from '@prisma/client';

export type JwtPrincipal = {
  userId: string;
  email: string;
  branchId: string;
  roles: RoleName[];
};

type JwtPayload = {
  sub: string;
  email: string;
  branchId: string;
  roles: RoleName[];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: JwtPayload): JwtPrincipal {
    return { userId: payload.sub, email: payload.email, branchId: payload.branchId, roles: payload.roles };
  }
}
