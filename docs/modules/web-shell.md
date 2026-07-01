# Web Shell Module

## Purpose

The web shell provides the first authenticated user experience for RMC HMS using Next.js 15, React 19, Tailwind CSS, and shadcn/ui-compatible primitives.

## Routes

- `/`: redirects to `/sign-in`.
- `/sign-in`: posts credentials to the API through a server action.
- `/dashboard`: requires an access token cookie and loads the current branch from the API.

## Authentication Flow

The sign-in server action calls `POST /auth/sign-in`, then stores access and refresh tokens in HTTP-only cookies. The dashboard reads the access token server-side and redirects to sign-in if the token is absent or invalid.

## Design System

The app uses Tailwind design tokens compatible with shadcn/ui conventions. Shared class merging lives in `src/lib/utils.ts`, and the first reusable primitive is `src/components/ui/button.tsx`.

## Extension Rules

New screens should use server components by default, server actions for mutations, and shared UI primitives instead of one-off styling.
