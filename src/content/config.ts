import { z, defineCollection } from 'astro:content'

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

export const collections = {
    blog: blogCollection,
}
