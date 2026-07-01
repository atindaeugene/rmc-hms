import { RoleName } from '@prisma/client';

export type StaffUserProps = {
  id: string;
  branchId: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: RoleName[];
  createdAt: Date;
  updatedAt: Date;
};

export class StaffUser {
  constructor(private readonly props: StaffUserProps) {}

  get id(): string { return this.props.id; }
  get branchId(): string { return this.props.branchId; }
  get email(): string { return this.props.email; }
  get roles(): RoleName[] { return [...this.props.roles]; }

  toJSON(): StaffUserProps {
    return { ...this.props, roles: [...this.props.roles] };
  }
}
