import type { APIRoute } from 'astro'
import {
    getFlamingoDataUri,
    getMonochromeLogoDataUri,
    pngResponse,
    readOgCache,
    renderOg,
    writeOgCache,
} from '../../og/render'
import { defaultTemplate } from '../../og/templates'

const CACHE_KEY = 'default.png'

export const GET: APIRoute = async () => {
    const cached = await readOgCache(CACHE_KEY)
    if (cached) return pngResponse(cached)

    const [logo, flamingo] = await Promise.all([getMonochromeLogoDataUri(), getFlamingoDataUri()])
    const png = await renderOg(defaultTemplate(logo, flamingo))
    await writeOgCache(CACHE_KEY, png)
    return pngResponse(png)
}
