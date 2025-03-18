// @ts-check
import path from 'node:path'
import url from 'node:url'

import { createTwoslasher } from '@ap0nia/mdsx/twoslash-svelte'
import { createMdsxPreprocessor } from '@ap0nia/mdsx/preprocessor'
import { rendererFloatingSvelte } from '@ap0nia/mdsx/floating-renderer-svelte'
import { transformerTwoslash } from '@shikijs/twoslash'
import shikiRehype from '@shikijs/rehype'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const projectRoot = path.resolve(__dirname, '..', '..')

const rootNodeModules = path.join(projectRoot, 'node_modules')

const relativeBlueprintPath = path.join(
  'src',
  'lib',
  'components',
  'markdown',
  'blueprint-default',
  'blueprint.svelte',
)

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    createMdsxPreprocessor({
      blueprints: {
        default: {
          path: path.resolve(__dirname, relativeBlueprintPath),
        },
      },
      unified: (processor) => {
        return processor.use(shikiRehype, {
          addLanguageClass: true,
          themes: {
            light: 'github-light',
            dark: 'github-dark-high-contrast',
          },
          defaultColor: false,
          transformers: [
            {
              name: 'vitepress:add-class',
              pre(node) {
                node.properties['lang'] = this.options.lang
                this.addClassToHast(node, 'vp-code')
              },
              code(node) {
                node.properties['lang'] = this.options.lang
              },
            },
            transformerTwoslash({
              langs: ['ts', 'tsx', 'svelte'],
              twoslasher: createTwoslasher({
                nodeModules: rootNodeModules,
              }),
              renderer: rendererFloatingSvelte(),
            }),
          ],
        })
      },
    }),
  ],
}

export default config
