import { Injectable } from '@nestjs/common';
import { Branch } from '../../domain/entities/branch.entity';
import { BranchesRepository } from '../../application/ports/branches.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaBranchesRepository implements BranchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveById(id: string): Promise<Branch | null> {
    const branch = await this.prisma.branch.findFirst({ where: { id, isActive: true } });
    return branch ? new Branch(branch) : null;
  }
}
