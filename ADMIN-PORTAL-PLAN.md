# Prima Packages admin portal — implementation plan

Date: 25 September 2026. Planning only; no production changes or customer-data uploads authorized by this document.

## Objective and architecture

Replace repetitive spreadsheet entry with one mobile-friendly order workspace, retaining the financial distinctions in Prima_Packages_Multi_Product.xlsx.

- Existing Next.js storefront and /admin interface: Vercel.
- API and business rules: Cloudflare Workers, preferably api.primapackages.pk.
- PostgreSQL database and administrator authentication: Supabase.
- Browser sends authenticated requests to Workers; Workers verifies identity and staff permissions before accessing records. Supabase Auth handles sign-in directly.
- Free-tier hosting/database allowances are a target, not an unlimited-service guarantee. Existing Vercel Hobby commercial-use eligibility remains a separate hosting decision before production launch.

## Workbook-to-portal mapping

| Workbook | Portal | Preserve |
| --- | --- | --- |
| Orders Log | Orders and order detail | Order ID/date, customer/brand, total, received, balance, payment status, notes, delivery cost, funding source and paid state |
| Order Items | Products inside each order | Multiple items under one order; quantity, agreed unit rate and item total |
| Expenses Log | Expenses | Description, date, category, product type, brand, funding source, amount and paid state |
| Business Account | Business account ledger | Opening balance, actual receipts, paid business-funded expenses and delivery |
| Dashboard | Overview and reports | Sales, received, outstanding, costs, profit, partner funding, monthly trends, category margins and payment-status counts |

## Daily workflow and screens

1. Dashboard: prominent New Order, Record Payment and Add Expense actions; overdue orders, designs awaiting approval, advances pending and ready-to-dispatch orders. Search by order ID, customer, brand or phone.
2. Orders: mobile cards and desktop table; filters for dates, source, production status, payment status and due date.
3. One order screen: customer and contact details, source (Instagram/WhatsApp/website/other), items, specifications, design reference, promised date, notes, payments, delivery and activity history.
4. Add product lines within the order. Catalog selections prefill size/color/quantity and current prices; admin can record the actual agreed price with an adjustment reason. Custom products are supported.
5. Payments: add advance or later installment with amount, actual receipt date, method, receiving account/funding destination and reference. Never overwrite a running received-total cell.
6. Expenses: quick form, optional order/item association, category, product type, funding source (Business/Ismail/Rizwan), paid/unpaid and payment date. Delivery is recorded once, not again as a duplicate expense.
7. Customers: find previous orders and reuse details. Do not automatically merge different people merely because they share a name or brand.
8. Reports/account: financial totals, monthly filter, product-category contribution, partner contributions/reimbursements and spreadsheet export.

## Separate order, design and payment states

- Order: New request → Confirmed → Production → Ready → Dispatched → Completed; cancellation supported with a reason.
- Design: Pending artwork → In progress → Awaiting approval → Approved, with approval date/reference.
- Payment: Unpaid/Partial/Paid calculated from financial records; overpayments remain visible as credit, never silently clamped away.
- Production normally requires approved design and verified 50% advance of the confirmed total. Owner exceptions require a reason and audit entry.
- Dispatch normally requires balance clearance. Track due dates and partial item progress where one order has several products.
- Website requests are not confirmed sales until accepted by staff. Cancelled orders, refunds and incurred costs must be handled explicitly, not deleted from history.

## Financial rules

- Item sale = quantity × agreed unit price. Pack-based catalog prices are converted to explicit piece quantities and corresponding rates; preserve pack selection and agreed total to avoid rounding changes.
- Confirmed order amount = item totals, less recorded discount, plus customer delivery charge if applicable. Keep customer delivery charge separate from delivery expense.
- Balance = confirmed amount − net customer payments. Keep sales, money received, receivables and business cash separate.
- Business cash = opening balance + actual business-account receipts/contributions − business-paid expenses, delivery, refunds, withdrawals and partner reimbursements. No expense hits cash until paid.
- Partner-paid expenses count as business costs but do not reduce business cash. Track actual paid amounts owed to Ismail/Rizwan separately from planned unpaid spending. Reimbursements clear the partner balance without counting the cost again.
- Match the workbook's management report: confirmed order sales less recorded costs, regardless of funding source. Label this as order-based profit, not cash balance or statutory accounts.
- Category contribution = item sales − associated product costs; delivery and shared overhead shown separately, as in the workbook. Missing cost associations are flagged, not guessed.
- Store monetary values precisely; calculate totals on the backend. Store agreed order price snapshots so future catalog edits never change existing orders.
- Monthly receipts use payment date, not order date. Historical payment dates missing in Excel stay marked unknown/imported; do not invent installment history.

## Data model

Core tables: staff profiles/roles, customers, orders, order_items, payments/refunds, expenses, expense_payments, accounts, account/partner movements, design references, status history, audit log and import batches/mappings. Link expenses to orders/items where known. Database-generated IDs, foreign keys, constraints and transactional writes prevent orphan or half-saved orders.

Start with owner and invited staff access. Staff handles orders and production; financial visibility and corrections require explicit permission. No public admin registration.

## Security, reliability and privacy

- Backend authorization on every operation; hiding /admin is not security. Apply database row-level access rules and keep privileged keys exclusively in server secrets.
- Restrict cross-origin browser access to approved frontend origins, but still verify tokens and roles. Validate amounts, transitions and input on the server.
- Public website order submission cannot read admin records. Add request limits, spam protection and duplicate-submission keys.
- Critical writes must be atomic and repeat-safe; protect concurrent edits. Payment corrections are linked reversals/corrections with who/when/why history.
- Private artwork/payment proofs require restricted storage and short-lived access. Start with notes/references and modest uploads to control storage.
- Paginate lists. Show retryable errors; never show Saved before database confirmation. No offline editing in the first version.
- Maintain encrypted backup/export and test restore. Confirm free-tier pause, retention and backup limits before launch.

## Excel migration

1. Keep original workbook untouched. Read only populated records; omit empty formula template rows and total rows.
2. Preview customers, orders, item rows, receipts, expenses, funding sources and delivery records.
3. Validate unique legacy order IDs and item relationships. Preserve source row references and flag ambiguous brand-name expense matches.
4. Import received-to-date as a historical aggregate receipt with a migration note, not fabricated installments. Unknown dates/statuses require review.
5. Prevent repeated imports using batch/source identifiers. Reconcile sales, received, outstanding, all expenses, delivery, business cash and partner totals.
6. Explain differences before acceptance: workbook monthly receipts use order date; dashboard cash may omit opening balance; partner-funding formulas may include unpaid entries. Do not silently reproduce or correct these discrepancies.
7. Take a verified pre-launch export and agree a cutover point; avoid parallel manual entry in both systems afterward.

## Delivery phases

1. Foundation: schema, financial rules, sample data, secure login, roles and API skeleton.
2. Operational MVP: order/customer forms, multiple products, statuses, payments, costs, due dates and search. Prove calculations with sample orders first.
3. Finance: business cash, partner funding, profit/category/monthly reports and exports.
4. Migration: preview/import/reconciliation of the provided workbook; resolve flagged records.
5. Website integration: checkout creates a request once and displays its order reference; WhatsApp handoff includes the same reference. Staff confirms price/design. Existing requests can be matched rather than duplicated.
6. Deployment: configure Workers, Supabase, domain/API settings, secrets and backups; validate on staging before production. Account access and final hosting eligibility must be resolved at this stage.

Automatic Instagram/WhatsApp message import, bots, payment gateways, inventory and full accounting are deferred. Manual social-channel entry is included from the MVP.

## Acceptance checks

- Multi-product order totals reconcile; advance plus later receipts yields correct balance.
- Gray/colored flyer and pack conversions retain correct agreed totals through order and export.
- Business-paid, partner-paid and unpaid expenses affect cash/profit/partner balances correctly; delivery is counted once.
- Duplicate submit/import/payment retry cannot double-record data; cancelled orders/refunds preserve history.
- Unauthorized users cannot read or mutate orders, finance or attachments through direct API calls.
- Mobile entry, dropdowns, searches and status changes work; restore test and migration reconciliation pass.
- Reconnecting or refreshing retains saved data; errors cannot masquerade as successful saves.
