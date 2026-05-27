// @ts-check
/**
 * Build-time config for @casoon/astro-site-files.
 *
 * All dynamic content for llms.txt / humans.txt / rss.xml is computed
 * here so astro.config.mjs stays a thin wrapper. We fetch the
 * OpenPlanner JSON exactly once and derive every dynamic section from
 * the same payload (team, speakers, sessions).
 *
 * Build behaviour:
 *   - OPENPLANNER_URL missing or unreachable → dynamic sections are
 *     omitted, but the build still succeeds with the static sections.
 *   - Blog markdown is read from disk because `astro:content` is not
 *     available inside the `astro:build:done` hook where this runs.
 */

import { loadEnv } from 'vite'
import { readdirSync, readFileSync } from 'node:fs'

const BLOG_DIR = './src/content/blog'

/**
 * @typedef {Object} OpenPlannerMember
 * @property {string} name
 * @property {number=} order
 * @property {{ name?: string, icon?: string, link: string }[]=} socials
 *
 * @typedef {Object} OpenPlannerSpeaker
 * @property {string} id
 * @property {string} name
 * @property {string=} jobTitle
 * @property {string=} company
 *
 * @typedef {Object} OpenPlannerSession
 * @property {string} id
 * @property {string} title
 *
 * @typedef {Object} OpenPlannerData
 * @property {{ id: string, members: OpenPlannerMember[] }[]=} teams
 * @property {OpenPlannerSpeaker[]=} speakers
 * @property {OpenPlannerSession[]=} sessions
 */

/** @returns {Promise<OpenPlannerData | null>} */
async function fetchOpenPlanner() {
    const { OPENPLANNER_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '')
    if (!OPENPLANNER_URL) return null
    try {
        const response = await fetch(OPENPLANNER_URL)
        if (!response.ok) return null
        return /** @type {OpenPlannerData} */ (await response.json())
    } catch {
        // Network failure at build time must not break the build.
        return null
    }
}

/**
 * Read blog frontmatter from disk. Minimal parser — no gray-matter
 * dependency needed for the title/date fields we care about.
 */
function readBlogPosts() {
    /** @type {{ title: string, date: Date, slug: string }[]} */
    const posts = []
    for (const file of readdirSync(BLOG_DIR)) {
        if (!file.endsWith('.md')) continue
        const raw = readFileSync(`${BLOG_DIR}/${file}`, 'utf-8')
        const match = raw.match(/^---\n([\s\S]*?)\n---/)
        if (!match) continue
        /** @type {[string, string][]} */
        const entries = []
        for (const line of match[1].split('\n')) {
            const m = line.match(/^(\w+):\s*(.*)$/)
            if (m) entries.push([m[1], m[2].trim()])
        }
        const fm = Object.fromEntries(entries)
        if (!fm.title || !fm.date) continue
        posts.push({
            title: fm.title.replace(/^["']|["']$/g, ''),
            date: new Date(fm.date),
            slug: file.replace(/\.md$/, ''),
        })
    }
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime())
}

/** @param {OpenPlannerData['teams']} teams */
function buildHumansTeam(teams) {
    if (!teams) return []
    return teams.flatMap((team) =>
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

/** @param {OpenPlannerSpeaker[]=} speakers */
function buildSpeakersSection(speakers) {
    if (!speakers?.length) return null
    return {
        title: 'Speakers (détail)',
        links: speakers
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
            .map((s) => {
                const meta = [s.jobTitle, s.company].filter(Boolean).join(' · ')
                return {
                    title: s.name,
                    url: `/speakers/${s.id}`,
                    ...(meta ? { description: meta } : {}),
                }
            }),
    }
}

/** @param {OpenPlannerSession[]=} sessions */
function buildSessionsSection(sessions) {
    if (!sessions?.length) return null
    return {
        title: 'Talks (détail)',
        links: sessions
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title, 'fr'))
            .map((s) => ({
                title: s.title,
                url: `/sessions/${s.id}`,
            })),
    }
}

function buildBlogSection() {
    const posts = readBlogPosts()
    return {
        title: 'Blog',
        links: posts.map((p) => ({ title: p.title, url: `/blog/${p.slug}` })),
    }
}

const STATIC_LLMS_SECTIONS = [
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
]

const RSS_CONFIG = {
    title: 'Sunny Tech — Blog',
    description: 'Articles et actualités de Sunny Tech, la conférence Tech organisée à Montpellier.',
    language: 'fr-FR',
    /** @param {string} siteUrl */
    getItems: async (siteUrl) =>
        readBlogPosts().map((p) => ({
            title: p.title,
            pubDate: p.date,
            link: `${siteUrl}/blog/${p.slug}/`,
        })),
}

/**
 * Build the full `siteFiles(...)` options object. Runs once at
 * astro.config.mjs load time.
 */
export async function buildSiteFilesOptions() {
    const openPlanner = await fetchOpenPlanner()

    /** @type {{ title: string, links: { title: string, url: string, description?: string }[] }[]} */
    const dynamicSections = []
    dynamicSections.push(buildBlogSection())
    const speakersSection = buildSpeakersSection(openPlanner?.speakers)
    if (speakersSection) dynamicSections.push(speakersSection)
    const sessionsSection = buildSessionsSection(openPlanner?.sessions)
    if (sessionsSection) dynamicSections.push(sessionsSection)

    return {
        // robots.txt — plugin default (User-agent: * Allow all + auto Sitemap reference)
        // is exactly what we want, no override.

        llms: {
            title: 'Sunny Tech',
            description:
                "Sunny Tech est la 1ère conférence Tech organisée à Montpellier. Conférence annuelle des technologies du numérique, créée par des passionnés, pour des passionnés, avec l'ambition de rayonner nationalement et internationalement à travers l'intervention de conférencier·e·s français de renom.",
            details:
                "L'édition 2026 se tient à la Faculté des Sciences de Montpellier (Place E. Bataillon, 34095 Montpellier), desservie par le tram 1 (arrêt « Université Montpellier Triolet »). Portes ouvertes de 8h30 à 19h sur deux jours.",
            sections: [...STATIC_LLMS_SECTIONS, ...dynamicSections],
        },

        sitemap: {
            exclude: ['/og-preview/'],
            rss: RSS_CONFIG,
        },

        humans: {
            team: buildHumansTeam(openPlanner?.teams),
            technology: ['Astro', 'TypeScript', 'Firebase Hosting'],
            note: 'Sunny Tech est une association loi 1901 à but non lucratif, organisée par des bénévoles passionnés de la communauté tech montpelliéraine.',
        },
    }
}
