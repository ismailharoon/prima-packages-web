import { DatabaseSync } from 'node:sqlite'
import { mkdirSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { applyCommand, emptyWorkspace } from './domain.mjs'

function database() {
  const directory = process.env.PRIMA_ADMIN_DATA_DIR || join(process.cwd(), '.local', 'admin')
  mkdirSync(directory, { recursive: true })
  const db = new DatabaseSync(join(directory, 'workspace.sqlite'))
  db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS workspace (id INTEGER PRIMARY KEY CHECK(id=1), data TEXT NOT NULL); CREATE TABLE IF NOT EXISTS commands (id TEXT PRIMARY KEY, digest TEXT NOT NULL);')
  db.prepare('INSERT OR IGNORE INTO workspace(id,data) VALUES(1,?)').run(JSON.stringify(emptyWorkspace()))
  return db
}
export function readWorkspace() {
  const db = database()
  try { return JSON.parse(db.prepare('SELECT data FROM workspace WHERE id=1').get().data) } finally { db.close() }
}
export function importPath() { return join(process.env.PRIMA_ADMIN_DATA_DIR || join(process.cwd(),'.local','admin'), 'import-preview.json') }
export function importAvailable() { return existsSync(importPath()) }
export function readImport() {
  if (!importAvailable()) throw new Error('No Excel import preview has been prepared.')
  return JSON.parse(readFileSync(importPath(),'utf8').replace(/^\uFEFF/,''))
}
export function saveCommand(command) {
  if (!/^[0-9a-f-]{36}$/i.test(command.requestId || '')) throw new Error('Missing request identifier. Reload and retry.')
  const db = database()
  const digest = createHash('sha256').update(JSON.stringify({action:command.action,payload:command.payload})).digest('hex')
  try {
    db.exec('BEGIN IMMEDIATE')
    const prior = db.prepare('SELECT digest FROM commands WHERE id=?').get(command.requestId)
    const current = JSON.parse(db.prepare('SELECT data FROM workspace WHERE id=1').get().data)
    if (prior) {
      if (prior.digest !== digest) throw new Error('This request identifier was already used for different data.')
      db.exec('COMMIT'); return current
    }
    let next
    if (command.action === 'importWorkbook') {
      const preview = readImport()
      if (command.payload.fingerprint !== preview.fingerprint) throw new Error('Import preview changed. Review it again.')
      if (current.importFingerprint === preview.fingerprint) { db.exec('COMMIT'); return current }
      if (current.orders.length || current.expenses.length || current.payments.length || current.movements.length) throw new Error('Import is available only in an empty workspace. Existing records will never be overwritten.')
      if (preview.blockers?.length) throw new Error('Resolve the import validation errors before importing.')
      next = { ...current, orders: preview.orders, payments: preview.payments, expenses: preview.expenses, openingBalance: preview.openingBalance, revision: current.revision + 1, importFingerprint: preview.fingerprint, audit: [{ id: crypto.randomUUID(), at: new Date().toISOString(), actor:'Local owner', action:'importWorkbook', detail:`Imported ${preview.source}; payment dates and production statuses require review.` }] }
    } else next = applyCommand(current,command)
    db.prepare('UPDATE workspace SET data=? WHERE id=1').run(JSON.stringify(next))
    db.prepare('INSERT INTO commands(id,digest) VALUES(?,?)').run(command.requestId,digest)
    db.exec('COMMIT')
    return next
  } catch (error) { try { db.exec('ROLLBACK') } catch {} throw error } finally { db.close() }
}
