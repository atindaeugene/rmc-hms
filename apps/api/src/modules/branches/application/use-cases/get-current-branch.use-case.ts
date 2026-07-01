import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BRANCHES_REPOSITORY, BranchesRepository } from '../ports/branches.repository';

@Injectable()
export class GetCurrentBranchUseCase {
  constructor(@Inject(BRANCHES_REPOSITORY) private readonly branches: BranchesRepository) {}

  async execute(branchId: string) {
    const branch = await this.branches.findActiveById(branchId);
    if (!branch) throw new NotFoundException('Branch not found');
    return branch.toJSON();
  }
}
