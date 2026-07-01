# Authentication Module

## Purpose

The authentication module signs staff users into RMC HMS using email and password credentials stored in PostgreSQL through Prisma.

## API

`POST /api/v1/auth/sign-in`

Request body:

```json
{
  "email": "user@example.com",
  "password": "minimum-8-characters"
}
```

Response body:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

## Architecture

- Domain entity: `AuthUser`
- Repository port: `UserAuthRepository`
- Use case: `SignInUseCase`
- Infrastructure adapter: `PrismaUserAuthRepository`
- HTTP interface: `AuthController`

## Authorization

RBAC is exposed through the `@Roles()` decorator and `RolesGuard`. JWT validation is handled by `JwtStrategy`, which maps token claims into a `JwtPrincipal`.

## Security Notes

Passwords are compared with bcrypt. Failed sign-in attempts return a generic unauthorized response. Tokens are signed with environment-provided secrets and must never be committed.
