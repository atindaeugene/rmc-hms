import { AuthUser } from '../../domain/entities/auth-user.entity';

export const USER_AUTH_REPOSITORY = Symbol('USER_AUTH_REPOSITORY');

export type UserWithPassword = {
  user: AuthUser;
  passwordHash: string;
  isActive: boolean;
};

export interface UserAuthRepository {
  findByEmail(email: string): Promise<UserWithPassword | null>;
}
