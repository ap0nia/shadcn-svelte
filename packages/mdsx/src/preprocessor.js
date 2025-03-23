// @ts-check

import path from 'node:path'

import { print } from 'esrap'
import MagicString from 'magic-string'
import { defaultHandlers } from 'mdast-util-to-hast'
import remarkDirective from 'remark-directive'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { parse, preprocess } from 'svelte/compiler'
import { unified } from 'unified'
import { VFile } from 'vfile'

import {
  DEFAULT_MARKDOWN_EXTENSIONS,
  MDSX_BLUEPRINT_NAME,
  MDSX_COMPONENT_NAME,
  MDSX_FLOATING_COMPONENT_NAME,
} from './constants.js'
import { rehypeBlueprint, rehypeGetFloating, rehypeRenderCode } from './unified/rehype.js'
import {
  remarkCleanSvelte,
  remarkContainers,
  remarkGithubAlerts,
  remarkNpmToYarn,
} from './unified/remark.js'
import { parseFrontmatter } from './utils/parse-frontmatter.js'
import { getRelativeFilePath } from './utils/path.js'

const CAPITAL_REGEX = /[A-Z]/

/**
 * @type Array<import('mdast').GitHubAlertVariant>
 */
const githubVariants = ['TIP', 'NOTE', 'WARNING', 'CAUTION', 'IMPORTANT']

/**
 * @template T
 * @param {T} value
 * @returns value is NonNullable<T>
 */
function notNull(value) {
  return value != null
}

/**
 * Generate a string representing the `<script context="module">` part of a Svelte component.
 *
 * @param {*} ast
 * @param {VFile} file
 * @returns {string}
 *
 * @example
 * ```html
 * <script context="module">
 *   export const metadata = { title: '', description: '' }
 *   const { title, description } = metadata
 * </script>
 * ```
 */
function createSvelteModule(ast, file) {
  const matter = file.data.matter ?? {}

  const metadata = JSON.stringify(matter)
  const metadataKeys = Object.keys(matter)
  const processedAst = ast?.content ? print(ast.content) : undefined

  const exportStatement = `export const metadata = ${metadata};\n`
  const metadataDeclaration = `const { ${metadataKeys.join(', ')} } = metadata;\n`
  const code = processedAst?.code ?? ''

  const content = `<script context="module">${exportStatement}${metadataDeclaration}${code}</script>`
  return content
}

/**
 * Generate a string representing the `<script>` part of a Svelte component.
 *
 * @param {*} ast
 * @param {VFile} file
 * @returns {string}
 */
function createSvelteInstance(ast, file) {
  const parsedAst = ast?.content ? print(ast.content) : undefined
  const code = parsedAst?.code ?? ''

  const lines = ['<script>', code]

  if (file.data.blueprint) {
    const importPath = getRelativeFilePath(file.path, file.data.blueprint.path)
    const hasDefaultExport = file.data.components?.includes('default')
    const defaultImport = hasDefaultExport ? `${MDSX_BLUEPRINT_NAME},` : ''
    const blueprintImportStatement = `\timport ${defaultImport} * as ${MDSX_COMPONENT_NAME} from "${importPath}";`

    lines.push(blueprintImportStatement)

    // Automatically add all capital imports to the main scope, e.g. custom components.
    const namedImports = file.data.components
      ?.filter((name) => name !== 'default')
      .filter((name) => name[0] && CAPITAL_REGEX.test(name[0]))

    if (namedImports?.length) {
      const namedImportStatements = namedImports.join(', ')
      const namedImportStatement = `\timport {${namedImportStatements}} from "${importPath}";`

      lines.push(namedImportStatement)
    }
  }

  if (file.data.floating) {
    const floatingImportStatement = `\timport * as ${MDSX_FLOATING_COMPONENT_NAME} from '@ap0nia/mdsx/floating-renderer-components';`

    lines.push(floatingImportStatement)
  }

  lines.push('</script>')

  const content = lines.join('\n')
  return content
}

/**
 * @param {VFile} file
 * @param {import('./preprocessor.js').MdsxPreprocessorConfig} config
 */
function getBlueprintData(file, config) {
  if (!config?.blueprints) return

  const blueprintName = file.data.matter?.['blueprint'] ?? 'default'

  if (blueprintName === false) return

  if (typeof blueprintName !== 'string') {
    throw new Error(`The "blueprint" name in the frontmatter must be a string in "${file.path}"`)
  }

  const blueprint = config.blueprints[blueprintName]

  if (blueprint == null) {
    const allBluePrints = JSON.stringify(config.blueprints, null, 2)
    throw Error(`"${blueprintName}" was not found in the provided blueprints, ${allBluePrints}`)
  }

  Object.assign(blueprint, {
    name: blueprintName,
    unified: blueprint.unified,
  })

  return blueprint
}

/**
 * @param {Parameters<import('./preprocessor.js').MarkupPreprocessor>[0]} options
 * @param {import('./preprocessor.js').MdsxPreprocessorConfig} config
 * @returns {Promise<import('svelte/compiler').Processed>}
 */
export async function compile(options, config) {
  const source = options.filename ?? ''
  const filename = source

  /**
   * @type import('vfile').Data
   */
  const data = {
    dependencies: [],
    instance: null,
    matter: {},
    preprocessors: [],
    components: [],
    ...config,
  }

  const file = new VFile({ value: options.content, path: source, data })

  const frontmatter = parseFrontmatter(file, config.frontmatterParser)

  file.data['matter'] = frontmatter.matter

  if (frontmatter.value) {
    file.value = frontmatter.value
  }

  const blueprint = getBlueprintData(file, config)

  const handlers = {
    ...defaultHandlers,
    /**
     * @type import('mdast-util-to-hast').Handler
     */
    Tabs(state, node, parent) {
      const tabs = /** @type import('mdast').Tabs */ (node)

      /**
       * @type import('hast').ElementContent
       */
      const element = {
        type: 'element',
        tagName: tabs.type,
        properties: {
          sync: tabs.sync,
          groupId: tabs.groupId,
          value: tabs.value,
        },
        children: tabs.children
          .flatMap((child) => handlers[child.type](state, child, parent))
          .filter(notNull),
      }

      return element
    },
    /**
     * @type import('mdast-util-to-hast').Handler
     */
    TabsList(state, node, parent) {
      const tabsList = /** @type import('mdast').TabsList */ (node)

      /**
       * @type import('hast').ElementContent
       */
      const element = {
        type: 'element',
        tagName: tabsList.type,
        properties: {},
        children: tabsList.children
          .flatMap((child) => handlers[child.type](state, child, parent))
          .filter(notNull),
      }

      return element
    },
    /**
     * @type import('mdast-util-to-hast').Handler
     */
    TabsTrigger(state, node, parent) {
      const tabsTrigger = /** @type import('mdast').TabsTrigger */ (node)

      /**
       * @type import('hast').ElementContent
       */
      const element = {
        type: 'element',
        tagName: tabsTrigger.type,
        properties: {
          value: tabsTrigger.value,
          'data-title': tabsTrigger.value,

          // When this file is being processed, the vitepress plugin will parse for
          // an icon regex match.
          'vitepress-plugin-group-icons': `data-title="${tabsTrigger.value}"`,
        },
        children: tabsTrigger.children
          .flatMap((child) => handlers[child.type](state, child, parent))
          .filter(notNull),
      }

      return element
    },
    /**
     * @type import('mdast-util-to-hast').Handler
     */
    TabsContent(state, node, parent) {
      const tabsContent = /** @type import('mdast').TabsContent */ (node)

      /**
       * @type import('hast').ElementContent
       */
      const element = {
        type: 'element',
        tagName: tabsContent.type,
        properties: {
          value: tabsContent.value,
        },
        children: tabsContent.children
          .flatMap((child) => handlers[child.type](state, child, parent))
          .filter(notNull),
      }

      return element
    },

    /**
     * @type import('mdast-util-to-hast').Handler
     */
    GitHubAlert(state, node, parent) {
      const githubAlert = /** @type import('mdast').GitHubAlert */ (node)

      const { position: _position, children: _children, data: _data, ...properties } = githubAlert

      /**
       * @type import('hast').ElementContent
       */
      const element = {
        type: 'element',
        tagName: githubAlert.type,
        properties,
        children: githubAlert.children
          .flatMap((child) => handlers[child.type](state, child, parent))
          .filter(notNull),
      }

      return element
    },

    /**
     * @type import('mdast-util-to-hast').Handler
     */
    Details(state, node, parent) {
      const details = /** @type import('mdast').Details */ (node)

      const { position: _position, children: _children, data: _data, ...properties } = details

      /**
       * @type import('hast').ElementContent
       */
      const element = {
        type: 'element',
        tagName: details.type,
        properties,
        children: details.children
          .flatMap((child) => handlers[child.type](state, child, parent))
          .filter(notNull),
      }

      return element
    },

    /**
     * @type import('mdast-util-to-hast').Handler
     */
    containerDirective(state, node, parent) {
      const container = /** @type import('mdast-util-directive').ContainerDirective */ (node)

      /**
       * @type any
       */
      const uppercaseName = container.name.toUpperCase()

      if (githubVariants.includes(uppercaseName)) {
        const variant = /** @type import('mdast').GitHubAlertVariant */ (uppercaseName)

        /**
         * @type import('mdast').GitHubAlert
         */
        const githubAlert = {
          title: variant,
          ...container.attributes,
          type: 'GitHubAlert',
          variant,
          children: container.children,
        }

        return handlers.GitHubAlert(state, githubAlert, parent)
      }

      const lowercaseName = container.name.toLowerCase()

      switch (lowercaseName) {
        case 'details': {
          /**
           * @type import('mdast').Details
           */
          const details = {
            type: 'Details',
            ...container.attributes,
            children: container.children,
          }

          return handlers.Details(state, details, parent)
        }

        default: {
          return
        }
      }
    },

    /**
     * @type import('mdast-util-to-hast').Handler
     */
    leafDirective(_state, _node, _parent) {
      return
    },

    /**
     * @type import('mdast-util-to-hast').Handler
     */
    textDirective(_state, _node, _parent) {
      return
    },
  }

  /**
   * @type import('./preprocessor.js').AnyProcessor
   */
  // First, use all the core remark plugins.
  let processor = unified()
    .use(remarkParse)
    .use(remarkCleanSvelte)
    .use(remarkNpmToYarn)
    .use(remarkDirective)
    .use(remarkContainers)
    .use(remarkGithubAlerts)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: /** @type import('mdast-util-to-hast').Handlers */ (handlers),
    })

  // User can add or override the processor as desired.

  processor = (await config.unified?.(processor, config)) ?? processor

  if (blueprint) {
    data.dependencies?.push(blueprint.path)
    data.blueprint = blueprint
    processor = (await blueprint.unified?.(processor, config)) ?? processor
  }

  const preprocessors = config.preprocessors ?? []

  // Finally, use all the core rehype plugins.
  processor = processor
    .use(rehypeRenderCode)
    .use(rehypeBlueprint)
    .use(rehypeGetFloating)
    .use(rehypeStringify, { allowDangerousHtml: true })

  const processed = await processor.process(file)

  const { code, dependencies } = await preprocess(String(processed), preprocessors, { filename })

  if (dependencies) {
    data.dependencies?.push(...dependencies)
  }

  const parsed = parse(code)

  const s = new MagicString(code)

  if (blueprint == null) {
    /**
     * @type import('svelte/compiler').Processed
     */
    const compiled = {
      code: s.toString(),
      map: s.generateMap({ source }),
      dependencies: Array.from(new Set(data.dependencies)),
    }

    return compiled
  }

  // Remove existing svelte instance script.
  if (parsed['instance']) {
    s.remove(parsed['instance'].start, parsed['instance'].end)
  }

  // Remove existing svelte module script
  if (parsed['module']) {
    s.remove(parsed['module'].start, parsed['module'].end)
  }

  // Prepend styles first, overriding any existing styles.
  if (parsed['css']) {
    s.remove(parsed['css'].start, parsed['css'].end)
    const cssContent = s.original.substring(parsed['css'].start, parsed['css'].end)
    s.prepend(cssContent)
  }

  if (data.components?.includes('default')) {
    // Wrap script with blueprint.
    s.prepend(`<${MDSX_BLUEPRINT_NAME} {metadata}>\n`)
    s.append(`</${MDSX_BLUEPRINT_NAME}>\n`)
  }

  // Prepend new svelte instance script.
  const svelteInstance = createSvelteInstance(parsed['instance'], file)
  s.prepend(svelteInstance)

  // Prepend new svelte module script.
  const svelteModule = createSvelteModule(parsed['module'], file)
  s.prepend(svelteModule)

  /**
   * @type import('svelte/compiler').Processed
   */
  const compiled = {
    code: s.toString(),
    map: s.generateMap({ source }),
    dependencies: Array.from(new Set(data.dependencies)),
  }

  return compiled
}

/**
 * @type import('./preprocessor.js').createMdsxMarkupPreprocessor
 */
export function createMdsxMarkupPreprocessor(config = {}) {
  const extensions = config?.extensions ?? DEFAULT_MARKDOWN_EXTENSIONS

  return async (options) => {
    if (options.filename == null) return

    const fileExtension = path.extname(options.filename)

    if (!extensions.includes(fileExtension)) return

    const result = await compile(options, config)

    return result
  }
}

/**
 * @type import('./preprocessor.js').createMdsxPreprocessor
 */
export function createMdsxPreprocessor(config = {}) {
  /**
   * @type import('svelte/compiler').PreprocessorGroup
   */
  const mdsxPreprocessor = {
    name: 'mdsx',
    markup: createMdsxMarkupPreprocessor(config),
  }

  return mdsxPreprocessor
}
