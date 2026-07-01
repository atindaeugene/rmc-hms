import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../../auth/interfaces/http/decorators/current-user.decorator';
import { JwtPrincipal } from '../../../auth/interfaces/http/strategies/jwt.strategy';
import { GetCurrentBranchUseCase } from '../../application/use-cases/get-current-branch.use-case';

@Controller({ path: 'branches', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class BranchesController {
  constructor(private readonly getCurrentBranch: GetCurrentBranchUseCase) {}

  @Get('current')
  current(@CurrentUser() user: JwtPrincipal) {
    return this.getCurrentBranch.execute(user.branchId);
  }
}
