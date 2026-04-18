import { slugify } from './slug'
import { EVENT_SLUG_SUFFIX } from './event'

/**
 * Deterministic slug used as the filename for a speaker's OG image and
 * referenced from the speaker page's <meta property="og:image">. Both sides
 * must agree, so this helper is the single source of truth.
 *
 * Format: `{name-kebab}-{last-6-of-id}-{EVENT_SLUG_SUFFIX}`. The id fragment
 * keeps filenames unique even when two speakers share a name slug.
 */
export function speakerOgSlug(name: string, id: string): string {
    const base = slugify(name)
    const idFragment = slugify(id).slice(-6) || id.slice(-6) || id
    return base ? `${base}-${idFragment}-${EVENT_SLUG_SUFFIX}` : `${id}-${EVENT_SLUG_SUFFIX}`
}
