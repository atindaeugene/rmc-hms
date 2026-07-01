import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { USER_AUTH_REPOSITORY } from './application/ports/user-auth.repository';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { PrismaUserAuthRepository } from './infrastructure/repositories/prisma-user-auth.repository';
import { AuthController } from './interfaces/http/auth.controller';
import { JwtStrategy } from './interfaces/http/strategies/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    JwtStrategy,
    { provide: USER_AUTH_REPOSITORY, useClass: PrismaUserAuthRepository },
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
