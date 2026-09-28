import type { Metadata } from 'next'
import { AdminGate } from '@/components/admin/AdminGate'
import './admin.css'
export const metadata: Metadata = { title:'Admin workspace', robots:{index:false,follow:false}, alternates:{canonical:'/admin'} }
export default function AdminPage() { return <AdminGate /> }
