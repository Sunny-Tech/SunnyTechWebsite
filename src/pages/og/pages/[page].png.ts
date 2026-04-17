import type { APIRoute } from 'astro'
import { getFlamingoDataUri, getMonochromeLogoDataUri, renderOg } from '../../../og/render'
import { pageTemplate } from '../../../og/templates'

type PageSpec = {
    title: string
    eyebrow?: string
    description?: string
}

const PAGES: Record<string, PageSpec> = {
    team: {
        eyebrow: 'Équipe',
        title: 'Les bénévoles',
        description: 'Une association à but non lucratif, créée par la communauté tech de Montpellier.',
    },
    speakers: {
        eyebrow: 'Programme',
        title: 'Speakers',
        description: "Découvrez les conférencier·e·s de l'édition 2026.",
    },
    schedule: {
        eyebrow: 'Programme',
        title: 'Schedule',
        description: 'Deux jours de conférences les 2 et 3 juillet 2026.',
    },
    jobs: {
        eyebrow: 'Sponsors',
        title: "Offres d'emploi",
        description: 'Les opportunités proposées par nos sponsors.',
    },
    location: {
        eyebrow: 'Venue',
        title: 'Lieu & accès',
        description: 'Faculté des Sciences de Montpellier — place Eugène Bataillon.',
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

export const GET: APIRoute = async ({ props }) => {
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
    return new Response(new Uint8Array(png), {
        headers: { 'Content-Type': 'image/png' },
    })
}
