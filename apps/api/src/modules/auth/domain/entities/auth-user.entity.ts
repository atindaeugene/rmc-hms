import { RoleName } from '@prisma/client';

export type AuthUserProps = {
  id: string;
  email: string;
  branchId: string;
  firstName: string;
  lastName: string;
  roles: RoleName[];
};

export class AuthUser {
  constructor(private readonly props: AuthUserProps) {}

  get id(): string { return this.props.id; }
  get email(): string { return this.props.email; }
  get branchId(): string { return this.props.branchId; }
  get roles(): RoleName[] { return [...this.props.roles]; }

  hasRole(role: RoleName): boolean {
    return this.props.roles.includes(role);
  }

  toClaims(): AuthUserProps {
    return { ...this.props, roles: [...this.props.roles] };
  }
}
