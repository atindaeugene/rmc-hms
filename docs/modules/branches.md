# Branches Module

## Purpose

The branches module provides the foundation for multi-branch operations across Renice Medical Center facilities.

## API

`GET /api/v1/branches/current`

Requires a valid bearer access token. The endpoint returns the active branch associated with the authenticated user.

## Architecture

- Domain entity: `Branch`
- Repository port: `BranchesRepository`
- Use case: `GetCurrentBranchUseCase`
- Infrastructure adapter: `PrismaBranchesRepository`
- HTTP interface: `BranchesController`

## Data Model

The `Branch` model stores a unique branch code, branch name, active status, and timestamps. Users reference a required `branchId`, which allows future modules to scope clinical and operational records by branch.

## Extension Rules

Future modules must carry branch context from the authenticated principal and apply branch filters at repository boundaries. Cross-branch access should be limited to explicitly authorized roles.
