import { defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        image: z
            .object({
                src: z.string(),
                alt: z.string(),
            })
            .optional(),
    }),
})

const ticketsCollection = defineCollection({
    loader: file('src/data/tickets/tickets.json'),
    schema: z.object({
        name: z.string(),
        price: z.number(),
        url: z.url(),
        startDate: z.iso.date().optional(),
        endDate: z.iso.date().optional(),
        ticketsCount: z.number(),
        available: z.boolean(),
        soldOut: z.boolean(),
        highlighted: z.boolean(),
        message: z.string().optional(),
        displayNewsletterRegistration: z.boolean().optional(),
    }),
})

export const collections = {
    blog: blogCollection,
    tickets: ticketsCollection,
}
