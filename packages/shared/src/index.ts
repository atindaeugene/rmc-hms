export const SYSTEM_ROLES = [
  'SUPER_ADMIN',
  'BRANCH_ADMIN',
  'DOCTOR',
  'NURSE',
  'RECEPTIONIST',
  'PHARMACIST',
  'LAB_TECHNICIAN',
  'ACCOUNTANT',
] as const;

export type SystemRole = (typeof SYSTEM_ROLES)[number];

export type AuthenticatedUser = {
  id: string;
  email: string;
  branchId: string;
  roles: SystemRole[];
};

export type ApiResponse<T> = {
  data: T;
  requestId: string;
};
