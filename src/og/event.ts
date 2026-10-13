/**
 * Single source of truth for the event metadata used when generating OG
 * images, filenames, and page copy. Update here to roll to the next edition.
 */
export const EVENT = {
    shortName: 'Sunny Tech',
    /** Lowercase identifier used inside URLs and filenames. */
    slug: 'sunnytech',
    year: 2027,
    /** ISO dates of the event. */
    startDate: '2027-07-01',
    endDate: '2027-07-02',
    city: 'Montpellier',
    domain: 'sunny-tech.io',
    /** Pre-formatted FR display string for the footer & hero copy. */
    displayDates: '1er & 2 juillet 2027',
    tagline: 'La conférence Tech de Montpellier',
    description:
        'Une conférence annuelle des technologies du numérique, créée par des passionnés, pour des passionnés.',
} as const

/** `sunnytech-2027-07` — appended to speaker OG filenames. */
export const EVENT_SLUG_SUFFIX = `${EVENT.slug}-${EVENT.year}-${EVENT.startDate.split('-')[1]}`

/** `Sunny Tech 2027` — used in titles and default hero copy. */
export const EVENT_FULL_NAME = `${EVENT.shortName} ${EVENT.year}`

/** `Montpellier · sunny-tech.io` — used in the OG footer. */
export const EVENT_FOOTER_LOCATION = `${EVENT.city} · ${EVENT.domain}`
