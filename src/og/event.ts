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
    venue: {
        name: 'L’Institut Agro Montpellier',
        streetAddress: '2 place Pierre Viala',
        postalCode: '34060',
        latitude: 43.618423,
        longitude: 3.855472,
    },
    domain: 'sunny-tech.io',
    /** Pre-formatted FR display string for the footer & hero copy. */
    displayDates: '1er & 2 juillet 2027',
    tagline: 'La conférence Tech de Montpellier',
    description:
        'Une conférence annuelle des technologies du numérique, créée par des passionnés, pour des passionnés.',
} as const

/**
 * Edition whose programme (speakers, sessions, schedule) the site still shows,
 * labelled with this year. OPENPLANNER_URL now points to the new edition, which
 * has no programme yet, so the programme pages read the archived export of this
 * edition instead. Align it with EVENT and drop `openPlannerUrl` once
 * OpenPlanner holds the new programme.
 */
export const PROGRAM_EDITION = {
    year: 2026,
    startDate: '2026-07-02',
    displayDates: '2 & 3 juillet 2026',
    openPlannerUrl:
        'https://storage.googleapis.com/conferencecenterr.appspot.com/events/YFlN9koUK0qPuYkvbqQg/1f8cd1c0-b0ed-4f24-811d-d8b64718ea29.json',
} as const

/** `sunnytech-2026-07` — appended to speaker OG filenames. */
export const EVENT_SLUG_SUFFIX = `${EVENT.slug}-${PROGRAM_EDITION.year}-${PROGRAM_EDITION.startDate.split('-')[1]}`

/** `Sunny Tech 2027` — used in titles and default hero copy. */
export const EVENT_FULL_NAME = `${EVENT.shortName} ${EVENT.year}`

/** `Montpellier · sunny-tech.io` — used in the OG footer. */
export const EVENT_FOOTER_LOCATION = `${EVENT.city} · ${EVENT.domain}`
