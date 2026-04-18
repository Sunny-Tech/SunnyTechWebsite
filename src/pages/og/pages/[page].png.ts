import type { APIRoute } from 'astro'
import {
    getFlamingoDataUri,
    getMonochromeLogoDataUri,
    pngResponse,
    readOgCache,
    renderOg,
    writeOgCache,
} from '../../../og/render'
import { pageTemplate } from '../../../og/templates'
import { EVENT } from '../../../og/event'

type PageSpec = {
    title: string
    eyebrow?: string
    description?: string
}

const PAGES: Record<string, PageSpec> = {
    team: {
        eyebrow: 'Équipe',
        title: 'Les bénévoles',
        description: `Une association à but non lucratif, créée par la communauté tech de ${EVENT.city}.`,
    },
    speakers: {
        eyebrow: 'Programme',
        title: 'Speakers',
        description: `Découvrez les conférencier·e·s de l'édition ${EVENT.year}.`,
    },
    schedule: {
        eyebrow: 'Programme',
        title: 'Schedule',
        description: `Deux jours de conférences les ${EVENT.displayDates}.`,
    },
    jobs: {
        eyebrow: 'Sponsors',
        title: "Offres d'emploi",
        description: 'Les opportunités proposées par nos sponsors.',
    },
    location: {
        eyebrow: 'Venue',
        title: 'Lieu & accès',
        description: `Faculté des Sciences de ${EVENT.city} — place Eugène Bataillon.`,
    },
    anecdotes: {
        eyebrow: 'Bonus',
        title: 'Anecdotes des sponsors',
    },
    jeu: {
        eyebrow: 'Règlement',
        title: 'Règlement du jeu',
    },
    coc: {
        eyebrow: 'Communauté',
        title: 'Code de conduite',
        description: 'Une conférence respectueuse, inclusive et bienveillante pour tou·te·s.',
    },
    '404': {
        eyebrow: 'Erreur 404',
        title: 'Page introuvable',
    },
}

export function getStaticPaths() {
    return Object.keys(PAGES).map((page) => ({
        params: { page },
        props: PAGES[page],
    }))
}

export const GET: APIRoute = async ({ params, props }) => {
    const cacheKey = `pages/${params.page}.png`
    const cached = await readOgCache(cacheKey)
    if (cached) return pngResponse(cached)

    const [logo, flamingo] = await Promise.all([getMonochromeLogoDataUri(), getFlamingoDataUri()])
    const png = await renderOg(
        pageTemplate(
            logo,
            {
                eyebrow: props.eyebrow,
                title: props.title,
                description: props.description,
            },
            flamingo
        )
    )
    await writeOgCache(cacheKey, png)
    return pngResponse(png)
}
