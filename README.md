# LendFlow LMS

A loan-management application built with Next.js, Neon Managed Auth, and Neon Postgres.

## Included
- Email/password sign-in through Neon Managed Auth
- Protected dashboard and server-side profile checks
- Dashboard totals and recent borrower records queried from Neon
- Public registration disabled; accounts must be provisioned by an administrator

## Local setup
1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in the values.
4. Generate `NEON_AUTH_COOKIE_SECRET` with `openssl rand -base64 32`.
5. Run `npm run dev`.

## Environment variables
- `NEON_AUTH_BASE_URL`: Managed Auth URL for the Neon `lendflow` database.
- `NEON_AUTH_COOKIE_SECRET`: random secret of at least 32 characters.
- `DATABASE_URL`: PostgreSQL connection string for the `lendflow` database.

Never commit `.env.local`, `DATABASE_URL`, or credentials to GitHub.

## Deployment
Deploy to Vercel or another Node.js-capable host. Configure the three environment variables in the host dashboard and add the production origin to Neon Auth trusted domains.

## Schema note
The dashboard query expects borrower columns `id`, `borrower_number`, `first_name`, `last_name`, `phone`, `status`, and `created_at`. Verify these against the live schema before production use. Staff permissions must be checked in each server handler, not merely hidden in the UI.
