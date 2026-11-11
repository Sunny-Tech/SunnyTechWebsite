/**
 * Invoice line items served at /sponsors-items.json, built from the offers and
 * the comparison table of /sponsors-new so prices and contents never drift.
 * Item keys and titles are what the invoicing tool already knows: keep them
 * stable when renaming an offer on the page.
 */
import { CLASSIC_OFFERS, OFFER_COMPARISON, OPTIONS, SPECIAL_OFFERS } from './sponsoringData'

export type InvoiceItem = {
    title: string
    description: string
    /** Invoice line quantity, not the number of sponsors the offer accepts. */
    quantity: 1
    unit_price: { value: number; currency: 'EUR' }
    vat_rate: number
}

const VAT_RATE = 0.2

/** Page offer or option name → invoice item key and title. */
const INVOICE_NAMES: Record<string, { key: string; title: string }> = {
    Platinium: { key: 'Platinium', title: 'Platinium' },
    Gold: { key: 'Gold', title: 'Gold' },
    Silver: { key: 'Silver', title: 'Silver' },
    'Soirée Speakers': { key: 'Sponsor soirée speaker', title: 'Sponsor soirée speaker' },
    'Apéro Networking': { key: 'Sponsor soirée (networking)', title: 'Sponsor soirée (networking)' },
    'Espace détente': { key: 'Sponsor espace détente', title: 'Sponsor espace détente' },
    Soutien: { key: 'Soutien', title: 'Sponsor Soutien' },
    'Option recrutement': { key: 'Recrutement', title: 'Mettez en avant vos offres de recrutement' },
    'Places supplémentaires': { key: 'Places supplémentaires', title: 'Place supplémentaire' },
}

/** Comparison rows that are paid options, not part of an offer. */
const OPTION_ROW_PREFIX = 'Option '

/** Each line ends with a comma, as in the former hand-written file: the Qonto invoices rely on it. */
const LINE_SEPARATOR = ', \n'

const EMPTY_CELL = '–'
const INCLUDED_CELL = '✔'

/** `6 750 €` → 6750, `130 € / place` → 130 */
export function priceValue(price: string): number {
    const value = Number(price.split('€')[0].replace(/\D/g, ''))
    if (!Number.isFinite(value) || value <= 0) throw new Error(`Unreadable price "${price}"`)
    return value
}

function invoiceName(name: string) {
    const invoice = INVOICE_NAMES[name]
    if (!invoice) throw new Error(`No invoice item name for the sponsoring offer "${name}"`)
    return invoice
}

/** One "- label : value" line per comparison row the offer includes, comma-separated like the original file. */
function offerDescription(column: number): string {
    return OFFER_COMPARISON.flatMap((group) => group.rows)
        .filter((row) => !row.label.startsWith(OPTION_ROW_PREFIX))
        .map((row) => ({ label: row.label, value: row.values[column] }))
        .filter(({ value }) => value !== EMPTY_CELL)
        .map(({ label, value }) => (value === INCLUDED_CELL ? `- ${label}` : `- ${label} : ${value}`))
        .join(LINE_SEPARATOR)
}

function item(name: string, price: string, description: string): [string, InvoiceItem] {
    const { key, title } = invoiceName(name)
    return [
        key,
        {
            title,
            description,
            quantity: 1,
            unit_price: { value: priceValue(price), currency: 'EUR' },
            vat_rate: VAT_RATE,
        },
    ]
}

export function invoiceItems(): { offres: Record<string, InvoiceItem> } {
    const offers = [...CLASSIC_OFFERS, ...SPECIAL_OFFERS].map((offer, column) =>
        item(offer.name, offer.price, offerDescription(column))
    )
    const options = OPTIONS.map((option) => item(option.name, option.price, option.text))
    return { offres: Object.fromEntries([...offers, ...options]) }
}
