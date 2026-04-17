import type { APIRoute } from 'astro'
import { getFlamingoDataUri, getMonochromeLogoDataUri, renderOg } from '../../og/render'
import { defaultTemplate } from '../../og/templates'

export const GET: APIRoute = async () => {
    const [logo, flamingo] = await Promise.all([getMonochromeLogoDataUri(), getFlamingoDataUri()])
    const png = await renderOg(defaultTemplate(logo, flamingo))
    return new Response(new Uint8Array(png), {
        headers: { 'Content-Type': 'image/png' },
    })
}
