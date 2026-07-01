import { Module } from '@nestjs/common';
import { BRANCHES_REPOSITORY } from './application/ports/branches.repository';
import { GetCurrentBranchUseCase } from './application/use-cases/get-current-branch.use-case';
import { PrismaBranchesRepository } from './infrastructure/repositories/prisma-branches.repository';
import { BranchesController } from './interfaces/http/branches.controller';

@Module({
  controllers: [BranchesController],
  providers: [
    GetCurrentBranchUseCase,
    { provide: BRANCHES_REPOSITORY, useClass: PrismaBranchesRepository },
  ],
  exports: [GetCurrentBranchUseCase],
})
export class BranchesModule {}
