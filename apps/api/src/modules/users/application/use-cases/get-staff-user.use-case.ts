import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtPrincipal } from '../../../auth/interfaces/http/strategies/jwt.strategy';
import { STAFF_USERS_REPOSITORY, StaffUsersRepository } from '../ports/staff-users.repository';
import { UserManagementPolicy } from '../policies/user-management.policy';

export type GetStaffUserQuery = {
  requestedBy: JwtPrincipal;
  userId: string;
};

@Injectable()
export class GetStaffUserUseCase {
  constructor(@Inject(STAFF_USERS_REPOSITORY) private readonly users: StaffUsersRepository) {}

  async execute(query: GetStaffUserQuery) {
    if (!UserManagementPolicy.canManageUsers(query.requestedBy)) {
      UserManagementPolicy.resolveTargetBranch(query.requestedBy);
    }

    const user = await this.users.findById(query.userId);
    if (!user) throw new NotFoundException('Staff user not found');

    UserManagementPolicy.assertCanReadUser(query.requestedBy, user.branchId);
    return user.toJSON();
  }
}
