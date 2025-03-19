// @ts-check

import { toMarkdown } from 'mdast-util-to-markdown'
import { CONTINUE, SKIP, visit } from 'unist-util-visit'
import npmToYarn from 'npm-to-yarn'

/**
 * Svelte logic blocks are enclosed by braces and usually start with # or @ .
 *
 * @example
 *
 * {@html 'hello'}
 *
 * {#if true}hello{/if}
 */
const SVELTE_LOGIC_BLOCK = /{[#:/@]\w+.*}/

/**
 */
const ELEMENT_OR_COMPONENT = /<[A-Za-z]+[\s\S]*>/

/**
 * @param {string} value
 */
function isSvelteBlock(value) {
  return SVELTE_LOGIC_BLOCK.test(value)
}

/**
 * @param {string} value
 */
function isElementOrComponent(value) {
  return ELEMENT_OR_COMPONENT.test(value)
}

/**
 * @param {import('mdast').RootContent} node
 */
function convertParagraphToHtml(node) {
  let value = ''

  if ('children' in node) {
    for (const child of node.children) {
      if (child.type === 'text' || child.type === 'html') {
        value += child.value
      } else {
        value += toMarkdown(child)
      }
    }
  }

  // type-assertion.
  const html = /** @type import('mdast').Html */ (node)

  html.type = 'html'
  html.value = value
}

/**
 * @type import('unified').Plugin
 */
export function remarkCleanSvelte() {
  return async (tree) => {
    const root = /** @type import('mdast').Root */ (tree)

    visit(root, 'paragraph', (node) => {
      const firstChild = node.children[0]

      if (!firstChild) return CONTINUE

      if (firstChild.type !== 'text' && firstChild.type !== 'html') return CONTINUE

      if (!isSvelteBlock(firstChild.value)) return CONTINUE

      if (!isElementOrComponent(firstChild.value)) return CONTINUE

      convertParagraphToHtml(node)

      return SKIP
    })
  }
}

/**
 * @type import('unified').Plugin
 * @param {import('./remark-to-yarn').RemarkNpmToYarnOptions} [options={}]
 */
export function remarkNpmToYarn(options = {}) {
  const converters = options.converters ?? ['yarn', 'pnpm', 'bun']

  // const sync = options.sync ?? false

  const conversionResolvers = converters.map((converter) => {
    if (typeof converter === 'string') {
      /**
       * @param {string} code
       */
      const resolver = (code) => npmToYarn(code, converter)

      /**
       * @type import('./remark-to-yarn').CustomConverter
       */
      const customConverter = [converter, resolver]

      return customConverter
    }

    return converter
  })

  return (root) => {
    visit(root, 'code', (node, index, parent) => {
      const code = /** @type import('mdast').Code */ (node)

      if (code.meta !== 'npm2yarn') return

      const ancestor = /** @type import('mdast').Parent */ (parent)

      const children = conversionResolvers.map((conversion) => {
        /**
         * @type import('mdast').TabContent
         */
        const tabContent = {
          type: 'TabContent',
          value: conversion[0],
          children: [
            {
              ...code,
              value: conversion[1](code.value),
            },
          ],
        }

        return tabContent
      })

      children.unshift({
        type: 'TabContent',
        value: 'npm',
        children: [
          {
            ...code,
            value: npmToYarn(code.value, 'npm'),
          },
        ],
      })

      ancestor.children[index] = {
        type: 'Tabs',
        children,
      }
    })
  }
}
