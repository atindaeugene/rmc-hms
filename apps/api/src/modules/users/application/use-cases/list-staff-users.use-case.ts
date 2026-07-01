import { Inject, Injectable } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { JwtPrincipal } from '../../../auth/interfaces/http/strategies/jwt.strategy';
import { STAFF_USERS_REPOSITORY, StaffUsersRepository } from '../ports/staff-users.repository';
import { UserManagementPolicy } from '../policies/user-management.policy';

export type ListStaffUsersQuery = {
  requestedBy: JwtPrincipal;
  branchId?: string;
  search?: string;
};

@Injectable()
export class ListStaffUsersUseCase {
  constructor(@Inject(STAFF_USERS_REPOSITORY) private readonly users: StaffUsersRepository) {}

  async execute(query: ListStaffUsersQuery) {
    let branchId = query.branchId;
    if (!query.requestedBy.roles.includes(RoleName.SUPER_ADMIN)) {
      branchId = UserManagementPolicy.resolveTargetBranch(query.requestedBy, query.branchId);
    } else if (!UserManagementPolicy.canManageUsers(query.requestedBy)) {
      UserManagementPolicy.resolveTargetBranch(query.requestedBy, query.branchId);
    }

    const users = await this.users.list({ branchId, search: query.search?.trim() || undefined });
    return users.map((user) => user.toJSON());
  }
}
