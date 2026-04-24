import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import {
    getFlamingoDataUri,
    getMonochromeLogoDataUri,
    pngResponse,
    readOgCache,
    renderOg,
    writeOgCache,
} from '../../../og/render'
import { pageTemplate } from '../../../og/templates'

export async function getStaticPaths() {
    const entries = await getCollection('blog')
    return entries.map((entry) => ({
        params: { slug: entry.id },
        props: {
            title: entry.data.title,
            date: entry.data.date.toISOString(),
        },
    }))
}

export const GET: APIRoute = async ({ params, props }) => {
    const cacheKey = `blog/${params.slug}.png`
    const cached = await readOgCache(cacheKey)
    if (cached) return pngResponse(cached)

    const [logo, flamingo] = await Promise.all([getMonochromeLogoDataUri(), getFlamingoDataUri()])
    const date = new Date(props.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    const png = await renderOg(
        pageTemplate(
            logo,
            {
                eyebrow: `Blog · ${date}`,
                title: props.title,
            },
            flamingo
        )
    )
    await writeOgCache(cacheKey, png)
    return pngResponse(png)
}
