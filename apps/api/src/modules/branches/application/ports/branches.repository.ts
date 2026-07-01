import { Branch } from '../../domain/entities/branch.entity';

export const BRANCHES_REPOSITORY = Symbol('BRANCHES_REPOSITORY');

export interface BranchesRepository {
  findActiveById(id: string): Promise<Branch | null>;
}
