// @ts-check

/// <reference types="@ap0nia/mdsx/types/hast" />
/// <reference types="@ap0nia/mdsx/types/vfile" />

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import ts from 'typescript'
import { visit } from 'unist-util-visit'

import { createTwoslasher } from '@ap0nia/mdsx/twoslash-svelte'
import { createMdsxPreprocessor } from '@ap0nia/mdsx/preprocessor'
import { rendererFloatingSvelte } from '@ap0nia/mdsx/floating-renderer-svelte'
import shikiRehype from '@shikijs/rehype'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerRenderWhitespace,
  transformerMetaHighlight,
  // transformerMetaWordHighlight,
} from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/twoslash'
import adapter from '@sveltejs/adapter-static'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const projectRoot = path.resolve(__dirname, '..', '..')

const rootNodeModules = path.join(projectRoot, 'node_modules')

const relativeBlueprintPath = path.join(
  'src',
  'lib',
  'components',
  'markdown',
  'blueprint-default',
  'index.ts',
)

/**
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 * @typedef {import('unified').Transformer<MdastRoot, MdastRoot>} MdastTransformer
 */

export const styles = [
  {
    name: 'default',
    label: 'Default',
  },
  {
    name: 'new-york',
    label: 'New York',
  },
  {
    name: 'daisy-default',
    label: 'daisyUI Default',
  },
  {
    name: 'daisy-new-york',
    label: 'daisyUI New York',
  },
]

/**
 * @param {string} meta
 * @see https://github.com/rehype-pretty/rehype-pretty-code/blob/eba61cbe7cb22a230702ff1e20b4483b917ae220/packages/core/src/utils.ts#L56C1-L89C2
 */
export function parseBlockMetaString(meta) {
  const titleMatch = meta.match(/title="([^"]*)"/)
  const title = titleMatch?.[1] ?? null
  meta = meta.replace(titleMatch?.[0] ?? '', '')

  const captionMatch = meta.match(/caption="([^"]*)"/)
  const caption = captionMatch?.[1] ?? null
  meta = meta.replace(captionMatch?.[0] ?? '', '')

  return {
    title,
    caption,
    meta,
  }
}

/**
 * @param {string} meta
 */
function parseMetaString(meta) {
  const sections = meta.split(' ')

  const entries = sections.reduce((previous, current) => {
    const [key, value] = current.split('=')

    const isNormalKey = /^[A-Z0-9_]+$/i.test(key)

    if (isNormalKey) return [...previous, [key, value || true]]

    return previous
  }, /** @type Array<Array<boolean | string>> */ ([]))

  const parsedMeta = Object.fromEntries(entries)

  const rehypePrettyCodeParsedMeta = parseBlockMetaString(meta)

  const resolvedMeta = {
    ...parsedMeta,
    ...rehypePrettyCodeParsedMeta,
    /**
     * @link {parsedMeta} can read title= values without being enclosed in double quotes.
     * rehypePrettyCode does not. Allow either one.
     *
     * @example
     *
     * ```js title=hello.js
     * ```
     *
     * @example
     *
     * ```js title="hello.js"
     * ```
     */
    title: rehypePrettyCodeParsedMeta.title || parsedMeta.title,
    caption: rehypePrettyCodeParsedMeta.caption || parsedMeta.caption,
  }

  return resolvedMeta
}

function getComponentSourceFileContent(src = '') {
  try {
    const resolvedSrc = src.replace('../', './')

    if (!resolvedSrc) return

    const filePath = path.join(process.cwd(), resolvedSrc)

    // twoslash is sensitive to whitespace for its directives, so examples will
    // typically start with a prettier-ignore directive.
    const contents = fs.readFileSync(filePath, 'utf8').replace('<!-- prettier-ignore -->\n', '')

    return contents
  } catch {
    // noop
  }
}

/**
 * @returns {HastTransformer} - Unified Transformer
 */
function rehypeComponentExample() {
  return (tree, file) => {
    const nameRegex = /name="([^"]+)"/

    visit(tree, 'raw', (node, index, parent) => {
      const raw = /** @type import('hast').Raw */ (node)

      if (!raw?.value?.startsWith('<ComponentPreview')) return

      const match = raw.value.match(nameRegex)

      const name = match ? match[1] : null

      if (!name) return

      file.data.dependencies ??= []

      for (const style of styles) {
        const src = path.join('src', 'lib', 'registry', style.name, 'example', `${name}.svelte`)

        file.data.dependencies.push(path.resolve(__dirname, src))

        const sourceCode = getComponentSourceFileContent(src)

        if (!sourceCode) continue

        /**
         * @type import('hast').RootContent
         */
        const sourceCodeNode = {
          type: 'element',
          tagName: 'pre',
          properties: {
            __src__: src,
            __style__: style.name,
            className: ['code'],
          },
          children: [
            {
              type: 'element',
              tagName: 'code',
              properties: {
                className: [`language-svelte`],
              },
              children: [
                {
                  type: 'text',
                  value: sourceCode,
                },
              ],
            },
          ],
        }

        const p = /** @type import('hast').Parent*/ (parent)

        p?.children.splice(index + 1, 0, sourceCodeNode)
      }
    })
  }
}

/**
 *
 * @returns {HastTransformer} - Unified Transformer
 */
function rehypePreData() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre') return

      const [codeEl] = node.children

      if (codeEl.type !== 'element') return

      if (codeEl.tagName !== 'code') return

      const meta = {
        __src__: node.properties?.__src__,
        __style__: node.properties?.__style__,
        twoslash: true,
      }

      const metastring = Object.entries(meta)
        .filter((entry) => entry[1] != null)
        .map((entry) => (entry[1] === true ? entry[0] : `${entry[0]}=${entry[1]}`))
        .join(' ')

      /**
       * @see https://github.com/shikijs/shiki/blob/c028cd35cf2644a17e950a913188f5122f2baf89/packages/rehype/src/handlers.ts#L59
       */
      codeEl.properties.metastring = metastring

      if (!codeEl.data) return

      if (!('meta' in codeEl.data)) return

      if (!codeEl.data.meta) return

      if (typeof codeEl.data.meta !== 'string') return

      // Extract event from meta and pass it down the tree.
      const regex = /event="([^"]*)"/

      const match = codeEl.data?.meta.match(regex)

      if (match) {
        codeEl.data.meta = codeEl.data.meta.replace(regex, '')
      }
    })
  }
}

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: adapter(),
    alias: {
      $content: '/src/content',
    },
  },
  preprocess: [
    createMdsxPreprocessor({
      blueprints: {
        default: {
          path: path.resolve(__dirname, relativeBlueprintPath),
        },
      },
      unified: (processor) => {
        return processor
          .use(rehypeComponentExample)
          .use(rehypePreData)
          .use(rehypeSlug)
          .use(rehypeAutolinkHeadings, { properties: { class: 'header-anchor' } })
          .use(shikiRehype, {
            addLanguageClass: true,
            themes: {
              light: 'github-light',
              dark: 'github-dark-high-contrast',
            },
            defaultColor: false,
            parseMetaString,
            transformers: [
              transformerNotationDiff(),
              transformerNotationHighlight(),
              transformerNotationWordHighlight(),
              transformerNotationFocus(),
              transformerNotationErrorLevel(),
              transformerRenderWhitespace(),
              transformerMetaHighlight(),
              // transformerMetaWordHighlight(),
              {
                name: 'vitepress:add-class',
                pre(hast) {
                  hast.properties['lang'] = this.options.lang
                  hast.properties['meta'] = this.options.meta?.__raw

                  const title = this.options.meta?.title || this.options.lang

                  // The value to be visible on the rendered markdown somewhere so it loads the icon.
                  hast.properties['vitepress-plugin-group-icons'] = `data-title="${title}"`

                  if (this.options.meta?.['__src__']) {
                    hast.properties['data-src'] = this.options.meta?.['__src__']
                  }

                  if (this.options.meta?.['__style__']) {
                    hast.properties['data-style'] = this.options.meta?.['__style__']
                  }

                  this.addClassToHast(hast, 'vp-code')

                  if (this.options.lang) {
                    this.addClassToHast(hast, `language-${this.options.lang}`)
                  }
                },
                code(hast) {
                  hast.properties['lang'] = this.options.lang
                  hast.properties['meta'] = this.options.meta?.__raw

                  if (this.options.meta?.showLineNumbers) {
                    hast.properties['data-line-numbers'] = ''
                    const lines = hast.children.filter((child) => child.type === 'element')
                    const maxDigits = Math.floor(Math.log10(Math.abs(lines.length))) + 1
                    hast.properties['data-line-numbers-max-digits'] = Math.min(maxDigits, 1)
                    hast.properties.style ||= ''
                    hast.properties.style =
                      `${hast.properties.style} --line-numbers-max-digits: ${maxDigits};`.trim()
                  }
                },
                span(_hast, _line, _col, lineElement) {
                  if (this.options.meta?.showLineNumbers) {
                    lineElement.properties['data-line'] = ''
                  }
                },
              },
              transformerTwoslash({
                langs: ['ts', 'tsx', 'svelte'],
                twoslasher: createTwoslasher({
                  nodeModules: rootNodeModules,
                }),
                twoslashOptions: {
                  compilerOptions: {
                    jsx: ts.JsxEmit.Preserve,
                    paths: {
                      $lib: ['./src/lib'],
                      '$lib/*': ['./src/lib/*'],
                    },
                    moduleResolution: ts.ModuleResolutionKind.Bundler,
                    module: ts.ModuleKind.ESNext,
                    target: ts.ScriptTarget.ESNext,
                  },
                },
                explicitTrigger: true,
                renderer: rendererFloatingSvelte(),
              }),
            ],
          })
      },
    }),
  ],
}

export default config
