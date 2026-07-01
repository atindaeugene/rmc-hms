import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPrincipal } from '../../../auth/interfaces/http/strategies/jwt.strategy';
import { STAFF_USERS_REPOSITORY, StaffUsersRepository } from '../ports/staff-users.repository';
import { UserManagementPolicy } from '../policies/user-management.policy';

export type CreateStaffUserCommand = {
  requestedBy: JwtPrincipal;
  branchId?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: RoleName[];
};

@Injectable()
export class CreateStaffUserUseCase {
  constructor(@Inject(STAFF_USERS_REPOSITORY) private readonly users: StaffUsersRepository) {}

  async execute(command: CreateStaffUserCommand) {
    const branchId = UserManagementPolicy.resolveTargetBranch(command.requestedBy, command.branchId);
    const normalizedEmail = command.email.toLowerCase().trim();

    if (!command.roles.length) throw new BadRequestException('At least one role is required');
    if (!(await this.users.branchExists(branchId))) throw new BadRequestException('Target branch is not active');
    if (await this.users.emailExists(normalizedEmail)) throw new ConflictException('Email address is already assigned');

    const passwordHash = await bcrypt.hash(command.password, 12);
    const user = await this.users.create({
      branchId,
      email: normalizedEmail,
      passwordHash,
      firstName: command.firstName.trim(),
      lastName: command.lastName.trim(),
      roles: [...new Set(command.roles)],
    });

    return user.toJSON();
  }
}
