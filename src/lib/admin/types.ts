export type Funding = 'Business' | 'Ismail' | 'Rizwan'
export type OrderStatus = 'New request' | 'Confirmed' | 'Production' | 'Ready' | 'Dispatched' | 'Completed' | 'Cancelled' | 'Needs review'
export type DesignStatus = 'Pending artwork' | 'In progress' | 'Awaiting approval' | 'Approved'
export interface OrderItem { id: string; name: string; specification: string; category: string; quantity: number; unitPrice: number }
export interface Order {
  id: string; number: string; date: string; customer: string; brand: string; phone: string; address: string
  source: string; status: OrderStatus; design: DesignStatus; dueDate: string; notes: string; artwork: string
  paymentDueDate?: string; items: OrderItem[]; discount: number; deliveryCharge: number; version: number; createdAt: string
}
export interface Payment { id: string; orderId: string; amount: number; date: string; method: string; account: Funding; reference: string; kind: 'Receipt' | 'Refund'; reversalOf?: string; note: string }
export interface Expense { id: string; date: string; description: string; category: string; productType: string; brand: string; orderId: string; amount: number; funding: Funding; paid: boolean; paidDate: string; note: string; voided?: boolean }
export interface Movement { id: string; date: string; type: 'Capital in' | 'Partner repayment' | 'Owner withdrawal'; partner: 'Ismail' | 'Rizwan'; amount: number; note: string }
export interface AuditEntry { id: string; at: string; action: string; detail: string; actor: string }
export interface Workspace { schema: number; revision: number; orders: Order[]; payments: Payment[]; expenses: Expense[]; movements: Movement[]; audit: AuditEntry[]; openingBalance: number; importFingerprint?: string }
export interface ImportPreview { fingerprint: string; source: string; extractedAt: string; orders: Order[]; payments: Payment[]; expenses: Expense[]; openingBalance: number; warnings: string[]; totals: { sales: number; received: number; expenses: number; delivery: number; outstanding: number } }
export interface Envelope { state: Workspace; mode: 'local' | 'cloud'; importAvailable: boolean }
