import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { StaffUser } from '../../domain/entities/staff-user.entity';
import { CreateStaffUserRecord, StaffUserListFilter, StaffUsersRepository } from '../../application/ports/staff-users.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';

type StaffUserRecord = Prisma.UserGetPayload<{ include: { roles: true } }>;

@Injectable()
export class PrismaStaffUsersRepository implements StaffUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async branchExists(branchId: string): Promise<boolean> {
    const branch = await this.prisma.branch.findFirst({ where: { id: branchId, isActive: true }, select: { id: true } });
    return Boolean(branch);
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email }, select: { id: true } });
    return Boolean(user);
  }

  async create(record: CreateStaffUserRecord): Promise<StaffUser> {
    const user = await this.prisma.user.create({
      data: {
        branchId: record.branchId,
        email: record.email,
        passwordHash: record.passwordHash,
        firstName: record.firstName,
        lastName: record.lastName,
        roles: { create: record.roles.map((role) => ({ role })) },
      },
      include: { roles: true },
    });

    return this.toDomain(user);
  }

  async findById(id: string): Promise<StaffUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id }, include: { roles: true } });
    return user ? this.toDomain(user) : null;
  }

  async list(filter: StaffUserListFilter): Promise<StaffUser[]> {
    const where: Prisma.UserWhereInput = {
      branchId: filter.branchId,
      OR: filter.search
        ? [
            { email: { contains: filter.search, mode: 'insensitive' } },
            { firstName: { contains: filter.search, mode: 'insensitive' } },
            { lastName: { contains: filter.search, mode: 'insensitive' } },
          ]
        : undefined,
    };

    const users = await this.prisma.user.findMany({
      where,
      include: { roles: true },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    });

    return users.map((user) => this.toDomain(user));
  }

  private toDomain(user: StaffUserRecord): StaffUser {
    return new StaffUser({
      id: user.id,
      branchId: user.branchId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      roles: user.roles.map((role) => role.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
