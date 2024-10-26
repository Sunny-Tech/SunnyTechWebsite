/** @type {import("prettier").Config} */
export default {
    printWidth: 120,
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSameLine: true,
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
}
