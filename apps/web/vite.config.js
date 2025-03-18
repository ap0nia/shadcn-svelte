// @ts-check

import { defineConfig } from 'vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    sveltekit(),

    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      strategy: ['url'],
    }),

    tailwindcss(),
  ],
})

export default config
