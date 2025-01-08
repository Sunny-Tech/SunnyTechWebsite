import { z, defineCollection } from 'astro:content'
import { file } from 'astro/loaders'

const blogCollection = defineCollection({
    type: 'content',
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
        startDate: z.string().date(),
        endDate: z.string().date().optional(),
        ticketsCount: z.number(),
        available: z.boolean(),
        soldOut: z.boolean(),
        highlighted: z.boolean(),
    }),
})

export const collections = {
    blog: blogCollection,
    tickets: ticketsCollection,
}
