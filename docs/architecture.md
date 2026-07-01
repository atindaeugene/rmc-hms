# RMC HMS Architecture

RMC HMS is structured as a pnpm monorepo with isolated applications and shared contracts.

## Applications

- `apps/api`: NestJS REST API using Clean Architecture boundaries.
- `apps/web`: Next.js 15 web application using React 19, Tailwind CSS, and shadcn/ui-compatible components.
- `packages/shared`: Shared TypeScript contracts used by API and web layers.

## Backend Boundaries

Each backend module follows this structure:

- `domain`: entities and business invariants.
- `application`: use cases and repository ports.
- `infrastructure`: Prisma-backed repository implementations and external adapters.
- `interfaces`: HTTP controllers, DTOs, guards, decorators, and strategies.

Application services depend on ports, not Prisma. Prisma remains an infrastructure adapter.

## Security

Authentication uses JWT access and refresh tokens. Authorization uses explicit role metadata and guards. Multi-branch isolation is represented in JWT claims and enforced by branch-aware use cases.

## Module Approval Flow

This branch contains the foundation module only. New modules should be added only after explicit approval and must include documentation in `docs/modules`.
