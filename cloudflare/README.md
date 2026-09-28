# Cloud backend rollout

The Worker implements authenticated bookkeeping and PDF downloads.
`GET /health` is public and contains no business data. `GET /session` verifies a
Supabase access token with Auth and checks `prima_admins` using that same token.
`GET /workspace`, `POST /workspace` and `GET /invoice?orderId=...` require an
approved admin session. Workspace reads/writes additionally require a server-only
`SUPABASE_SERVICE_KEY`. Other routes fail closed.

Deploy from this directory using Wrangler (`npx wrangler deploy`). Sign into the
owner's Cloudflare account when prompted. Do not create a static Pages project.
The returned workers.dev address will be the frontend's API address during tests.

Rollout:
1. Run SQL migrations 001, 002, 003 in order; authorize the owner. 003 is rerunnable.
2. Keep the service credential in ignored `.env.cloud.local` for migration, and
   Cloudflare Worker secrets for runtime. Never use NEXT_PUBLIC or commit it.
3. `npx wrangler login`, then `npx wrangler deploy --config cloudflare/wrangler.jsonc`
   from the repository root. Set `SUPABASE_SERVICE_KEY` with
   `npx wrangler secret put SUPABASE_SERVICE_KEY --config cloudflare/wrangler.jsonc`.
4. Run `node --env-file=.env.cloud.local scripts/migrate-admin-cloud.mjs` to preview;
   pause local edits and rerun with `--apply` after checking the totals. Import
   refuses nonempty cloud workspaces and saves a local backup before writes.
5. Configure frontend NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
   NEXT_PUBLIC_ADMIN_API_URL (Worker URL) and NEXT_PUBLIC_ADMIN_MODE=cloud.
   Rebuild. Sign in and verify both approved access and unauthorized denial.
6. Test one controlled order/payment/expense workflow and PDF before domain cutover.

Storage currently uses a revision-locked snapshot with relational projections,
rewritten atomically for this small workspace. This deliberately preserves the
existing financial domain model and imported metadata. It is not a high-volume
design: move to incremental row-level commands before substantial growth.
Free-tier CPU and bandwidth suitability still requires deployed measurements.

Supabase is now the active cloud workspace after the verified initial import.
Local SQLite remains a backup; do not re-import it over cloud edits or enter orders
in two systems simultaneously. Both custom domains now point to the frontend Worker.

## Frontend preview deployment

`npm run frontend:build` builds the separate Vinext/Cloudflare frontend, then
`npm run frontend:deploy` publishes `dist/server/wrangler.json` to the
`prima-packages-site` Worker. Keep package.json `type: module`: SSR output must
use the `.js` filename expected by the runtime. Stop the local preview before
rebuilding on Windows to avoid locked output directories.

The frontend uses public Supabase configuration and the existing backend URL.
Local SQLite and local invoice modules are replaced with fail-closed stubs for
this build; `/api/admin-local` must return 403. The service key belongs only in
backend secrets. The original Next/Vercel build scripts remain available.

Temporary site: https://prima-packages-site.prima-packages-web.workers.dev
Admin: https://prima-packages-site.prima-packages-web.workers.dev/admin
The backend's explicit allowed origins includes this temporary address.
Verify sign-in, order reading and PDF download before moving the custom domain.

## GitHub automatic deployment

Connect each existing Worker to `ismailharoon/prima-packages-web`, production
branch `main`, repository root `/`, with non-production automatic builds disabled.
Use Node 22.19.0 or later supported Node 22 release (`NODE_VERSION` build variable).
Workers Builds installs dependencies from package-lock.json automatically.

| Worker | Build command | Deploy command |
| --- | --- | --- |
| prima-packages-site | npm run frontend:build | npm run frontend:deploy |
| prima-admin-api | npm run test:cloud | npm run cloud:deploy |

The frontend public configuration is supplied by vite.config.mts. Never add the
Supabase service key to frontend build variables. Its existing backend Worker
secret persists across deployments. SQL migrations and data imports are manual
maintenance actions, never part of the deployment commands. Keep the custom
domains declared in wrangler.frontend.jsonc when updating configuration.
