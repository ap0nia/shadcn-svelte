// @ts-check

import { defineConfig } from 'vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

const config = defineConfig({
  plugins: [
    sveltekit(),

    groupIconVitePlugin(),

    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      strategy: ['url', 'baseLocale'],
    }),

    tailwindcss(),
  ],
  server: {
    fs: {
      allow: ['CHANGELOG.md'],
    },
  },
})

export default config
