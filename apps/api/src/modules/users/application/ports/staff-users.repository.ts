import { RoleName } from '@prisma/client';
import { StaffUser } from '../../domain/entities/staff-user.entity';

export const STAFF_USERS_REPOSITORY = Symbol('STAFF_USERS_REPOSITORY');

export type CreateStaffUserRecord = {
  branchId: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  roles: RoleName[];
};

export type StaffUserListFilter = {
  branchId?: string;
  search?: string;
};

export interface StaffUsersRepository {
  branchExists(branchId: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
  create(record: CreateStaffUserRecord): Promise<StaffUser>;
  findById(id: string): Promise<StaffUser | null>;
  list(filter: StaffUserListFilter): Promise<StaffUser[]>;
}
