import type { APIRoute } from 'astro'
import { invoiceItems } from '../components/sponsoring/invoiceItems'

// Read by the sponsor invoicing tool: generated from the /sponsors-new offers.
export const GET: APIRoute = () =>
    new Response(JSON.stringify(invoiceItems(), null, 4), {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
