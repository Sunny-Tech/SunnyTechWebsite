/**
 * Helpers used by the Layout to pick the right OG image + declare its
 * media type. Kept out of the .astro frontmatter so Layout stays focused on
 * layout concerns.
 */

/**
 * Map a site pathname to the static OG image endpoint that covers it.
 *
 * Speaker and session pages pass an explicit `metaImage` prop instead and
 * never rely on this fallback.
 */
export function computeOgPath(pathname: string): string {
    const clean = pathname.replace(/\/$/, '') || '/'
    if (clean === '/speakers') return '/og/pages/speakers.png'
    if (clean === '/' || clean === '') return '/og/default.png'
    if (clean.startsWith('/schedule')) return '/og/pages/schedule.png'
    if (clean.startsWith('/blog')) return '/og/default.png'
    const staticPages = ['team', 'jobs', 'location', 'anecdotes', 'jeu', 'coc', '404']
    const seg = clean.replace(/^\//, '').split('/')[0]
    if (staticPages.includes(seg)) return `/og/pages/${seg}.png`
    return '/og/default.png'
}

/** Derive the MIME type for <meta property="og:image:type"> from the URL. */
export function computeOgImageType(imageUrl: string): string {
    const pathname = imageUrl.split('?')[0].toLowerCase()
    if (pathname.endsWith('.png')) return 'image/png'
    if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'image/jpeg'
    if (pathname.endsWith('.gif')) return 'image/gif'
    if (pathname.endsWith('.webp')) return 'image/webp'
    return 'image/png'
}
