# RMC HMS

Production-grade Hospital Management System for Renice Medical Center.

## Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui-compatible components
- Backend: NestJS, Prisma ORM, PostgreSQL
- Architecture: REST API, Clean Architecture, SOLID, Repository Pattern, JWT authentication, RBAC, multi-branch support

## Workspace

```text
apps/
  api/    NestJS REST API
  web/    Next.js application
packages/
  shared/ Shared TypeScript contracts
docs/
  architecture.md
  modules/
```

## Getting Started

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env` and provide secure values.
3. Start PostgreSQL and set `DATABASE_URL`.
4. Generate Prisma Client with `pnpm prisma:generate`.
5. Run migrations with `pnpm prisma:migrate`.
6. Start development servers with `pnpm dev`.

## Module Status

Implemented foundation module:

- API bootstrap
- Prisma persistence adapter
- Authentication sign-in flow
- JWT strategy
- RBAC guard and decorators
- Branch context module
- Next.js sign-in and dashboard shell

Next modules require explicit approval before implementation.

## Documentation

- [Architecture](docs/architecture.md)
- [Authentication Module](docs/modules/auth.md)
- [Branches Module](docs/modules/branches.md)
- [Web Shell Module](docs/modules/web-shell.md)
