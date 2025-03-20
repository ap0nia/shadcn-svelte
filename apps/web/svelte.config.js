// @ts-check

/// <reference types="@ap0nia/mdsx/types/hast" />

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import ts from 'typescript'
import { visit } from 'unist-util-visit'

import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import remarkGfm from 'remark-gfm'
import { createHighlighter } from 'shiki'

import { mdsx } from 'mdsx'
import { createTwoslasher } from '@ap0nia/mdsx/twoslash-svelte'
import { createMdsxPreprocessor } from '@ap0nia/mdsx/preprocessor'
import { rendererFloatingSvelte } from '@ap0nia/mdsx/floating-renderer-svelte'
import shikiRehype from '@shikijs/rehype'
import { transformerNotationErrorLevel } from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/twoslash'

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
]

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

  return parsedMeta
}

function getComponentSourceFileContent(src = '') {
  const resolvedSrc = src.replace('../', './')

  if (!resolvedSrc) return

  const filePath = path.join(process.cwd(), resolvedSrc)

  // twoslash is sensitive to whitespace for its directives, so examples will
  // typically start with a prettier-ignore directive.
  const contents = fs.readFileSync(filePath, 'utf8').replace('<!-- prettier-ignore -->\n', '')

  return contents
}

/**
 * Removes `<!-- prettier-ignore -->` and `// prettier-ignore` from code blocks
 * before they are converted to HTML for syntax highlighting.
 *
 * We do this because sometimes we want to force a line break in code blocks, but
 * prettier removes them, however, we don't want to include the ignore statement
 * in the final code block.
 *
 * One caveat is that if you did want to include the ignore statement in the final
 * code block, you'd have to do some hacky stuff like including it in the comment
 * itself and checking for it in the code block, but that's not something we need
 * at the moment.
 *
 * @returns {MdastTransformer} - Unified Transformer
 */
function remarkRemovePrettierIgnore() {
  return async (tree) => {
    visit(tree, 'code', (node) => {
      node.value = node.value
        .replaceAll('<!-- prettier-ignore -->\n', '')
        .replaceAll('// prettier-ignore\n', '')
    })
  }
}

/**
 * @returns {HastTransformer} - Unified Transformer
 */
function rehypeComponentExample() {
  return (tree) => {
    const nameRegex = /name="([^"]+)"/
    visit(tree, 'raw', (node, index, parent) => {
      if (!index) return

      const raw = /** @type import('hast').Raw */ (node)

      if (!raw?.value?.startsWith('<ComponentPreview')) return

      const match = raw.value.match(nameRegex)

      const name = match ? match[1] : null

      if (!name) return

      try {
        for (const style of styles) {
          const src = path.join('src', 'lib', 'registry', style.name, 'example', `${name}.svelte`)

          const sourceCode = getComponentSourceFileContent(src)

          if (!sourceCode) return

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
      } catch (e) {
        console.error(e)
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
 * Adds `data-metadata` to `<figure>` elements that contain a `<figcaption>`.
 * We use this to style elements within the `<figure>` differently if a `<figcaption>`
 * is present.
 *
 * @returns {HastTransformer} - Unified Transformer
 */
function rehypeHandleMetadata() {
  return async (tree) => {
    visit(tree, (node) => {
      if (node?.type === 'element' && node?.tagName === 'figure') {
        if (!('data-rehype-pretty-code-figure' in node.properties)) {
          return
        }

        const preElement = node.children.at(-1)
        if (preElement && 'tagName' in preElement && preElement.tagName !== 'pre') {
          return
        }

        const firstChild = node.children.at(0)

        if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'figcaption') {
          node.properties['data-metadata'] = ''
          const lastChild = node.children.at(-1)
          if (lastChild && 'properties' in lastChild) {
            lastChild.properties['data-metadata'] = ''
          }
        }
      }
    })
  }
}

/**
 * @type {import('rehype-pretty-code').Options}
 */
const prettyCodeOptions = {
  theme: 'github-dark',
  getHighlighter: (options) => {
    return createHighlighter({
      ...options,
      langs: [
        'plaintext',
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/svelte.mjs'),
        import('shiki/langs/shellscript.mjs'),
        import('shiki/langs/markdown.mjs'),
      ],
    })
  },
  keepBackground: false,
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = ['line--highlighted']
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['chars--highlighted']
  },
  transformers: [
    transformerNotationErrorLevel(),
    {
      name: 'vitepress:add-class',
      pre(node) {
        node.properties['lang'] = this.options.lang
        node.properties['meta'] = this.options.meta?.__raw
        node.properties['__src__'] = this.options.meta?.['__src__']
        node.properties['__style__'] = this.options.meta?.['__style__']

        this.addClassToHast(node, 'vp-code')
      },
      code(node) {
        node.properties['lang'] = this.options.lang
        node.properties['meta'] = this.options.meta?.__raw
        node.properties['__src__'] = this.options.meta?.['__src__']
        node.properties['__style__'] = this.options.meta?.['__style__']
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
}

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    // mdsx({
    //   extensions: ['.md'],
    //   // remarkPlugins: [remarkGfm, codeImport, remarkRemovePrettierIgnore],
    //   rehypePlugins: [
    //     // rehypeSlug,
    //     // rehypeComponentExample,
    //     // rehypePreData,
    //     [rehypePrettyCode, prettyCodeOptions],
    //     // rehypeHandleMetadata,
    //   ],
    //   blueprints: {
    //     default: {
    //       path: path.resolve(__dirname, relativeBlueprintPath),
    //     },
    //   },
    // }),

    createMdsxPreprocessor({
      blueprints: {
        default: {
          path: path.resolve(__dirname, relativeBlueprintPath),
        },
      },
      unified: (processor) => {
        return (
          processor
            .use(rehypeComponentExample)
            .use(rehypePreData)
            // .use(rehypePrettyCode, prettyCodeOptions)
            .use(shikiRehype, {
              addLanguageClass: true,
              themes: {
                light: 'github-light',
                dark: 'github-dark-high-contrast',
              },
              defaultColor: false,
              parseMetaString,
              transformers: [
                transformerNotationErrorLevel(),
                {
                  name: 'vitepress:add-class',
                  pre(node) {
                    node.properties['lang'] = this.options.lang
                    node.properties['meta'] = this.options.meta?.__raw
                    node.properties['__src__'] = this.options.meta?.['__src__']
                    node.properties['__style__'] = this.options.meta?.['__style__']

                    this.addClassToHast(node, 'vp-code')
                  },
                  code(node) {
                    node.properties['lang'] = this.options.lang
                    node.properties['meta'] = this.options.meta?.__raw
                    node.properties['__src__'] = this.options.meta?.['__src__']
                    node.properties['__style__'] = this.options.meta?.['__style__']
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
        )
      },
    }),
  ],
}

export default config
