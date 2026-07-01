import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { UserAuthRepository, UserWithPassword } from '../../application/ports/user-auth.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaUserAuthRepository implements UserAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserWithPassword | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });

    if (!user) return null;

    return {
      isActive: user.isActive,
      passwordHash: user.passwordHash,
      user: new AuthUser({
        id: user.id,
        email: user.email,
        branchId: user.branchId,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles.map((role) => role.role),
      }),
    };
  }
}
