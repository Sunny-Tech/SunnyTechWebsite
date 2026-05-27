// @ts-check
import { defineConfig, envField } from 'astro/config'
import { loadEnv } from 'vite'
import siteFiles from '@casoon/astro-site-files'

// Load env at config-time (Astro env helpers are not available here yet).
const { OPENPLANNER_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '')

// Fetch the team roster from OpenPlanner so humans.txt always reflects
// the real organising committee instead of a hard-coded list.
let humansTeam = []
if (OPENPLANNER_URL) {
    try {
        const response = await fetch(OPENPLANNER_URL)
        if (response.ok) {
            const data = await response.json()
            humansTeam = (data.teams ?? []).flatMap((team) =>
                (team.members ?? [])
                    .slice()
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((member) => {
                        const twitter = member.socials?.find(
                            (s) => s.icon?.toLowerCase() === 'twitter' || s.name?.toLowerCase() === 'twitter'
                        )
                        return {
                            name: member.name,
                            role: team.id,
                            ...(twitter ? { twitter: twitter.link } : {}),
                        }
                    })
            )
        }
    } catch {
        // Network failure at build time should not break the build.
        humansTeam = []
    }
}

// https://astro.build/config
export default defineConfig({
    site: 'https://sunny-tech.io',
    base: '/',

    redirects: {
        '/schedule': '/schedule/day-1',
    },

    env: {
        schema: {
            OPENPLANNER_URL: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_API_KEY: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_AUTH_DOMAIN: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_DATABASE_URL: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_PROJECT_ID: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_STORAGE_BUCKET: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_MESSAGING_SENDER_ID: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_APP_ID: envField.string({ context: 'client', access: 'public', optional: false }),
            FIREBASE_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
        },
    },

    integrations: [
        siteFiles({
            // robots.txt — defaults (User-agent: * Allow all) + auto Sitemap reference
            robots: {},
            // llms.txt — content index per llmstxt.org
            llms: {
                title: 'Sunny Tech',
                description:
                    "Sunny Tech est la 1ère conférence Tech organisée à Montpellier. Conférence annuelle des technologies du numérique, créée par des passionnés, pour des passionnés, avec l'ambition de rayonner nationalement et internationalement à travers l'intervention de conférencier·e·s français de renom.",
                details:
                    "L'édition 2026 se tient à la Faculté des Sciences de Montpellier (Place E. Bataillon, 34095 Montpellier), desservie par le tram 1 (arrêt « Université Montpellier Triolet »). Portes ouvertes de 8h30 à 19h sur deux jours.",
                sections: [
                    {
                        title: 'Programme',
                        links: [
                            { title: 'Programme jour 1', url: '/schedule/day-1' },
                            { title: 'Programme jour 2', url: '/schedule/day-2' },
                            { title: 'Sessions', url: '/sessions' },
                            { title: 'Speakers', url: '/speakers' },
                        ],
                    },
                    {
                        title: 'Informations pratiques',
                        links: [
                            { title: 'Lieu', url: '/location' },
                            { title: 'Code de conduite', url: '/coc' },
                            { title: 'Équipe', url: '/team' },
                            { title: 'Jobs', url: '/jobs' },
                            { title: 'Anecdotes', url: '/anecdotes' },
                            { title: 'Jeu', url: '/jeu' },
                        ],
                    },
                    {
                        title: 'Réseaux sociaux',
                        links: [
                            { title: 'Twitter / X', url: 'https://twitter.com/sunnytech_mtp' },
                            { title: 'LinkedIn', url: 'https://www.linkedin.com/company/sunny-tech-event' },
                            { title: 'Bluesky', url: 'https://bsky.app/profile/sunnytech.bsky.social' },
                        ],
                    },
                ],
                // Auto-pull blog posts from the markdown files on disk
                // (astro:content is not available inside the build:done hook).
                sources: [
                    async () => {
                        const { readdirSync, readFileSync } = await import('node:fs')
                        const dir = './src/content/blog'
                        const posts = readdirSync(dir)
                            .filter((f) => f.endsWith('.md'))
                            .map((file) => {
                                const raw = readFileSync(`${dir}/${file}`, 'utf-8')
                                const match = raw.match(/^---\n([\s\S]*?)\n---/)
                                if (!match) return null
                                const fm = Object.fromEntries(
                                    match[1]
                                        .split('\n')
                                        .map((line) => line.match(/^(\w+):\s*(.*)$/))
                                        .filter(Boolean)
                                        .map((m) => [m[1], m[2].trim()])
                                )
                                if (!fm.title || !fm.date) return null
                                return {
                                    title: fm.title.replace(/^["']|["']$/g, ''),
                                    date: new Date(fm.date),
                                    slug: file.replace(/\.md$/, ''),
                                }
                            })
                            .filter(Boolean)
                            .sort((a, b) => b.date.getTime() - a.date.getTime())
                        return {
                            title: 'Blog',
                            links: posts.map((p) => ({ title: p.title, url: `/blog/${p.slug}` })),
                        }
                    },
                ],
            },
            // sitemap.xml — exclude dev-only preview page; also generates rss.xml
            sitemap: {
                exclude: ['/og-preview/'],
                rss: {
                    title: 'Sunny Tech — Blog',
                    description: 'Articles et actualités de Sunny Tech, la conférence Tech organisée à Montpellier.',
                    language: 'fr-FR',
                    getItems: async (siteUrl) => {
                        const { readdirSync, readFileSync } = await import('node:fs')
                        const dir = './src/content/blog'
                        return readdirSync(dir)
                            .filter((f) => f.endsWith('.md'))
                            .map((file) => {
                                const raw = readFileSync(`${dir}/${file}`, 'utf-8')
                                const match = raw.match(/^---\n([\s\S]*?)\n---/)
                                if (!match) return null
                                const fm = Object.fromEntries(
                                    match[1]
                                        .split('\n')
                                        .map((line) => line.match(/^(\w+):\s*(.*)$/))
                                        .filter(Boolean)
                                        .map((m) => [m[1], m[2].trim()])
                                )
                                if (!fm.title || !fm.date) return null
                                const slug = file.replace(/\.md$/, '')
                                return {
                                    title: fm.title.replace(/^["']|["']$/g, ''),
                                    pubDate: new Date(fm.date),
                                    link: `${siteUrl}/blog/${slug}/`,
                                }
                            })
                            .filter(Boolean)
                            .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
                    },
                },
            },
            // humans.txt — team pulled from OpenPlanner JSON env
            humans: {
                team: humansTeam,
                technology: ['Astro', 'TypeScript', 'Firebase Hosting'],
                note: 'Sunny Tech est une association loi 1901 à but non lucratif, organisée par des bénévoles passionnés de la communauté tech montpelliéraine.',
            },
        }),
    ],
})
