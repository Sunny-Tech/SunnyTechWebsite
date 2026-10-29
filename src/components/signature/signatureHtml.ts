/**
 * Builds the Sunny Tech email signature. Email clients ignore stylesheets and
 * SVG, so the markup is a table with inline styles and absolute PNG URLs.
 */

export interface SignatureInput {
    firstName: string
    lastName: string
    phone?: string
}

const SITE_DOMAIN = 'sunny-tech.io'
const TEXT_COLOR = '#818181'
const NAME_COLOR = '#111111'

const SOCIALS = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sunnytech/', icon: 'linkedin.png' },
    { name: 'Bluesky', url: 'https://bsky.app/profile/sunnytech.bsky.social', icon: 'bluesky.png' },
]

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

/** `06 12 34 56 78` → `+33612345678`, keeps numbers already in international form. */
export function telHref(phone: string): string {
    const digits = phone.replace(/[^\d+]/g, '')
    return digits.startsWith('0') ? `+33${digits.slice(1)}` : digits
}

export function signatureHtml(input: SignatureInput, siteUrl: string): string {
    const site = siteUrl.replace(/\/$/, '')
    const fullName = escapeHtml(`${input.firstName} ${input.lastName}`.trim())
    const phone = input.phone?.trim()
    const linkStyle = `color:${TEXT_COLOR};text-decoration:none`

    const phoneHtml = phone
        ? ` <span style="color:${TEXT_COLOR}">|</span> <a href="tel:${escapeHtml(telHref(phone))}" style="${linkStyle}">${escapeHtml(phone)}</a>`
        : ''

    const socialsHtml = SOCIALS.map(
        (social) =>
            `<a href="${social.url}" style="display:inline-block;margin-right:6px" target="_blank"><img src="${site}/email-signature/${social.icon}" alt="${social.name}" width="20" height="20" style="display:block;border:0"></a>`
    ).join('')

    return [
        `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Tahoma,Arial,sans-serif;border-collapse:collapse">`,
        `<tr>`,
        `<td style="padding:0 12px 0 0;vertical-align:middle">`,
        `<a href="${site}" target="_blank"><img src="${site}/logos-sunnytech/logo_small.png" alt="Sunny Tech" width="70" height="69" style="display:block;border:0"></a>`,
        `</td>`,
        `<td style="vertical-align:middle;font-size:11px;line-height:150%;color:${TEXT_COLOR};white-space:nowrap">`,
        `<div style="font-size:16px;color:${NAME_COLOR}">${fullName}</div>`,
        `<div><a href="${site}" style="${linkStyle}" target="_blank">${SITE_DOMAIN}</a>${phoneHtml}</div>`,
        `<div style="padding-top:4px">${socialsHtml}</div>`,
        `</td>`,
        `</tr>`,
        `</table>`,
    ].join('')
}

export function signatureText(input: SignatureInput): string {
    const phone = input.phone?.trim()
    return [
        `${input.firstName} ${input.lastName}`.trim(),
        phone ? `${SITE_DOMAIN} | ${phone}` : SITE_DOMAIN,
        ...SOCIALS.map((social) => `${social.name}: ${social.url}`),
    ]
        .filter(Boolean)
        .join('\n')
}
