import { z, defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'

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
        url: z.string().url(),
        startDate: z.string().date().optional(),
        endDate: z.string().date().optional(),
        ticketsCount: z.number(),
        available: z.boolean(),
        soldOut: z.boolean(),
        highlighted: z.boolean(),
        message: z.string().optional(),
    }),
})

export const collections = {
    blog: blogCollection,
    tickets: ticketsCollection,
}
