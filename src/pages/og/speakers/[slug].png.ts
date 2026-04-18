import type { APIRoute } from 'astro'
import { OPENPLANNER_URL } from 'astro:env/client'
import type { OpenPlannerType } from '../../../type'
import {
    getFlamingoDataUri,
    getMonochromeLogoDataUri,
    pngResponse,
    readOgCache,
    renderOg,
    writeOgCache,
} from '../../../og/render'
import { speakerTemplate } from '../../../og/templates'
import { speakerOgSlug } from '../../../og/speakerSlug'

export async function getStaticPaths() {
    const response = await fetch(OPENPLANNER_URL)
    const data: OpenPlannerType = await response.json()
    const seen = new Map<string, number>()
    return data.speakers.map((speaker) => {
        let slug = speakerOgSlug(speaker.name, speaker.id)
        const count = (seen.get(slug) ?? 0) + 1
        seen.set(slug, count)
        if (count > 1) slug = `${slug}-${count}`
        return {
            params: { slug },
            props: {
                name: speaker.name,
                jobTitle: speaker.jobTitle,
                company: speaker.company,
                photoUrl: speaker.photoUrl,
            },
        }
    })
}

export const GET: APIRoute = async ({ params, props }) => {
    const cacheKey = `speakers/${params.slug}.png`
    const cached = await readOgCache(cacheKey)
    if (cached) return pngResponse(cached)

    const [logo, flamingo] = await Promise.all([getMonochromeLogoDataUri(), getFlamingoDataUri()])
    const png = await renderOg(
        speakerTemplate(
            logo,
            {
                name: props.name,
                jobTitle: props.jobTitle,
                company: props.company,
                photoUrl: props.photoUrl,
            },
            flamingo
        )
    )
    await writeOgCache(cacheKey, png)
    return pngResponse(png)
}
