// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
    site: 'https://sunny-tech.io',
    base: '/',
    redirects: {
        '/schedule': '/schedule/day-1'
    },
})
