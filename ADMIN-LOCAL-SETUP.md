# Local admin workspace

## Run on this computer

Requires Node 22.13+ (the installed Node 22.19 supports SQLite). SQLite is experimental in this Node release; production hosting will use the cloud adapter, not this file database.

1. Set `PRIMA_LOCAL_ADMIN=1` in the untracked `.env.local` file.
2. Run `npm run dev:local` for development, or `npm run build` followed by `npm run start:local` for the built preview.
3. Open `http://localhost:3100/admin`.

These local scripts bind only to 127.0.0.1. Do not expose this workspace through a tunnel, port forward or LAN server. This phase deliberately has no pretend username/password: anyone with access to this computer's local workspace can access its records. The local API requires explicit enablement, rejects other browser origins/non-local hostnames, and is disabled on Vercel/Cloudflare Pages. A public deployment requires real authentication and authorization, not this local mode.

## Data and backup

- The actual database is `.local/admin/workspace.sqlite`, with SQLite WAL files as needed. It is independent of browser storage and survives refreshes/server restarts.
- Data is private and ignored by Git. Do not delete `.local` to clear builds.
- Export Backup downloads a JSON snapshot with customers, orders, payments, expenses, movements and history. Store it privately. It contains customer and business data.
- While the server is stopped, copying the entire `.local/admin` directory provides a local recovery copy. To restore that copy, stop the server, retain the current folder under a different name and restore the full saved folder before starting. Do not copy only a live SQLite main file without its WAL.
- Automated off-device backups, encryption and cloud restore testing remain required before production use.

## Excel import

`scripts/prepare-admin-import.py <workbook-path>` reads the original workbook without editing it and writes `.local/admin/import-preview.json`. It needs Python with openpyxl; use the bundled runtime available in this environment.

Review Excel Import in Overview displays record counts, totals and interpretation warnings. Import only runs into an empty workspace, commits atomically and cannot duplicate an already imported workbook. Imported orders remain Needs review; undated aggregate receipts stay undated. Delivery is a single expense associated with its order. Brand matching links expenses only when there is one exact case-insensitive match.

Imported customer receipts follow the workbook's Business Account assumption that receipts were collected in Business. Later individual receipts can specify Business/Ismail/Rizwan. Validate historical classifications and production state before operating on an imported order.

## Implemented

- Multiple products per order; catalog size/color/quantity pricing with editable agreed unit rates and custom product lines.
- Atomic new order + advance; payment/refund history, credit balances and automatic outstanding amounts.
- Ordered production transitions with design/50% advance requirements; full payment before dispatch; optimistic version checks.
- Paid/unpaid expenses, delivery costs, business/partner funding and partner repayments/capital movements.
- Dashboard, search/status filters, monthly reports, product contribution, order CSV and full JSON export.
- Transactional local storage, repeat-safe command IDs, failed-write rollback and activity history.

## Next cloud stage (not deployed)

The same UI and domain rules can use a Cloudflare Worker API. Replace the local fetch adapter with that API, require Supabase Auth, verify every caller against an explicitly provisioned staff role, and use private database tables plus transactional writes. Cloudflare/Supabase accounts are not currently available; no credentials, remote data uploads or live changes have been made.

Still to build: production authentication/roles and relational cloud migrations, restricted file attachments, customer-record editing/reuse, audited order-price corrections, payment-entry reversals distinct from real refunds, partial supplier payments, automated checkout intake, automatic backups and the full migration/restore acceptance process. Local lists load the small workspace in full; cloud lists must be server-paginated.

Do not record a real refund merely to correct a typo in a historical payment. Financial corrections need the audited correction feature or a carefully reviewed data repair before live operation.

## Checks

`npm run test:admin` exercises monetary totals, funding separation, stage gates, monthly receipts, cancellation/refunds, input validation, optimistic versions and SQLite retry/rollback behavior. `npm run build` verifies the Next.js application.
