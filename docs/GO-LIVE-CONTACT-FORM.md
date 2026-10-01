# Go-Live Guide — Contact Form + MySQL

This covers deploying the Contact Us form (Browser → Next.js API → Prisma → MySQL)
to production on Netlify. The code is production-ready; the only required manual
step is provisioning a hosted MySQL and setting its URL in Netlify.

## Architecture (unchanged in production)

```
Browser  ──POST /api/contact──▶  Next.js API route (server)  ──Prisma──▶  MySQL
```

Database credentials live only in server-side environment variables. They are
never prefixed with `NEXT_PUBLIC_` and never reach the browser.

## 1. Provision a hosted MySQL (required)

Netlify cannot reach `localhost`. You need a remotely accessible MySQL 8.x, e.g.:

- A managed MySQL (AWS RDS, Google Cloud SQL, Azure Database for MySQL)
- PlanetScale, Railway, Aiven, or similar

Create a database (e.g. `proryn_db`) and a dedicated application user (avoid using
`root` in production). Note the host, port, user, password, and database name.

Build the connection string (URL-encode special characters in the password —
`@`→`%40`, `#`→`%23`, etc.):

```
mysql://APP_USER:URL_ENCODED_PASSWORD@DB_HOST:3306/proryn_db
```

If the provider requires TLS, append the SSL params it documents, for example:
`?sslaccept=strict` (PlanetScale) or the provider-specific equivalent.

## 2. Set the environment variable in Netlify

Netlify → Site settings → Environment variables → Add a variable:

- Key:   `DATABASE_URL`
- Value: the connection string from step 1
- Scopes: at least "Builds" and "Functions" (Production).

Do NOT put this value in `netlify.toml` or any committed file.

## 3. Apply the database schema to production

The migration is already created at
`prisma/migrations/20260914000000_init_contact_submissions/`.

Run this once against the production database (non-destructive — it only creates
the `contact_submissions` table and does not touch existing data):

```bash
# From a machine that can reach the production DB, with DATABASE_URL set to it:
pnpm prisma migrate deploy
```

Never run `prisma migrate reset` against production.

## 4. Deploy

Push to the branch Netlify builds. The Netlify build will:

1. `pnpm install` — runs Prisma's postinstall (engine generated, approved via `.npmrc`)
2. `pnpm build` — runs `prisma generate` then `next build`
3. Bundle the Prisma Lambda engine (`libquery_engine-rhel-openssl-3.0.x.so.node`)
   into the API function via `netlify.toml` `[functions] included_files`.

The `/api/contact` route runs as a Netlify serverless function on Node 20.

## 5. Verify in production

1. Open `https://<your-site>/contact`.
2. Submit the form with valid data → success message.
3. Confirm a row appears in the production `contact_submissions` table.
4. Submit invalid data (bad email/phone, short message) → inline/validation errors,
   no row written.

## What was configured for go-live

- `prisma/schema.prisma`: added `binaryTargets = ["native", "rhel-openssl-3.0.x"]`
  so the query engine is built for Netlify's Lambda runtime.
- `netlify.toml`: `[functions] included_files` bundles the Prisma engine; build env
  documented.
- `.npmrc`: approves Prisma/sharp build scripts so pnpm runs them non-interactively
  on Netlify.
- `package.json`: `build` runs `prisma generate && next build`; `postinstall` runs
  `prisma generate`.
- Frontend + API both validate email and phone format; server-side validation is
  authoritative; errors are generic (no DB details leaked); basic rate limiting.

## Notes & limitations

- Rate limiting is in-memory per function instance (best-effort). For a strict
  distributed limit, back it with a shared store (e.g. Upstash Redis).
- Keep the production DB user least-privileged (INSERT on `contact_submissions`
  is sufficient for the public form; migrations can use a separate privileged user).
```
