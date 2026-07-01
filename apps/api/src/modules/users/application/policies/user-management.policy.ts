import { ForbiddenException } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { JwtPrincipal } from '../../../auth/interfaces/http/strategies/jwt.strategy';

export class UserManagementPolicy {
  static canManageUsers(principal: JwtPrincipal): boolean {
    return principal.roles.includes(RoleName.SUPER_ADMIN) || principal.roles.includes(RoleName.BRANCH_ADMIN);
  }

  static resolveTargetBranch(principal: JwtPrincipal, requestedBranchId?: string): string {
    if (!this.canManageUsers(principal)) throw new ForbiddenException('Insufficient permissions');
    if (principal.roles.includes(RoleName.SUPER_ADMIN)) {
      if (!requestedBranchId) throw new ForbiddenException('A target branch is required');
      return requestedBranchId;
    }

    if (requestedBranchId && requestedBranchId !== principal.branchId) {
      throw new ForbiddenException('Branch administrators can only manage their own branch');
    }

    return principal.branchId;
  }

  static assertCanReadUser(principal: JwtPrincipal, userBranchId: string): void {
    if (principal.roles.includes(RoleName.SUPER_ADMIN)) return;
    if (principal.roles.includes(RoleName.BRANCH_ADMIN) && principal.branchId === userBranchId) return;
    throw new ForbiddenException('Insufficient permissions');
  }
}
