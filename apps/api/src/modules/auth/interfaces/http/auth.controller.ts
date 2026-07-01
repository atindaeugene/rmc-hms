import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { SignInDto } from './dto/sign-in.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly signIn: SignInUseCase) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signInWithPassword(@Body() dto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.signIn.execute(dto);
  }
}
