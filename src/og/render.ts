import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

// Resolve assets against the project root (where astro dev / astro build runs).
// __dirname points inside dist/.prerender/chunks/ after the build bundles this
// module, so any `__dirname`-relative asset lookup breaks at build time.
const PROJECT_ROOT = process.cwd()
const fromRoot = (p: string) => resolve(PROJECT_ROOT, p)

let cachedFonts: Awaited<ReturnType<typeof loadFonts>> | null = null
let cachedLogo: string | null = null
let cachedMonoLogo: string | null = null
let cachedFlamingo: string | null = null

async function loadFonts() {
    const [regular, bold] = await Promise.all([
        readFile(fromRoot('src/og/fonts/Roboto-Regular.ttf')),
        readFile(fromRoot('src/og/fonts/Roboto-Bold.ttf')),
    ])
    return [
        { name: 'Roboto', data: regular, weight: 400 as const, style: 'normal' as const },
        { name: 'Roboto', data: bold, weight: 700 as const, style: 'normal' as const },
    ]
}

export async function getLogoDataUri(): Promise<string> {
    if (cachedLogo) return cachedLogo
    const buf = await readFile(fromRoot('public/logos-sunnytech/logo_high.png'))
    cachedLogo = `data:image/png;base64,${buf.toString('base64')}`
    return cachedLogo
}

export async function getMonochromeLogoDataUri(): Promise<string> {
    if (cachedMonoLogo) return cachedMonoLogo
    const raw = await readFile(fromRoot('public/logos-sunnytech/logo-monochrome.svg'), 'utf-8')
    cachedMonoLogo = `data:image/svg+xml;base64,${Buffer.from(raw).toString('base64')}`
    return cachedMonoLogo
}

/**
 * Flamingo silhouette (from public/favicon.svg) with color overridden.
 * Satori supports SVG via data URI for <img>. Color can be tuned by caller.
 */
export async function getFlamingoDataUri(fillHex = '#ffffff'): Promise<string> {
    const key = `flamingo:${fillHex}`
    if (cachedFlamingo && cachedFlamingo.startsWith(`${key}|`)) {
        return cachedFlamingo.slice(key.length + 1)
    }
    const raw = await readFile(fromRoot('public/favicon.svg'), 'utf-8')
    // Repaint the favicon's pink (#FB4552) with the requested fill. The mask and
    // circle from the source SVG are preserved — the rendered result is the
    // flamingo silhouette clipped to its circle, in the chosen color.
    const svg = raw.replace(/#FB4552/gi, fillHex)
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
    cachedFlamingo = `${key}|${dataUri}`
    return dataUri
}

export async function renderOg(node: any): Promise<Buffer> {
    if (!cachedFonts) cachedFonts = await loadFonts()
    const svg = await satori(node, {
        width: 1200,
        height: 630,
        fonts: cachedFonts,
    })
    const png = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1200 },
    })
        .render()
        .asPng()
    return png
}
