// @ts-check

import { DEFAULT_MARKDOWN_EXTENSIONS, DEFAULT_SVELTE_EXTENSIONS } from './constants.js'
import { createMdsxPreprocessor } from './preprocessor.js'

/**
 * @type import('.').withMdsx
 */
export function withMdsx(svelteConfig, mdsxConfig) {
  const svelteExtensions = svelteConfig.extensions ?? DEFAULT_SVELTE_EXTENSIONS

  let extensions =
    mdsxConfig?.extensions ??
    svelteConfig.extensions?.filter((extension) => !svelteExtensions.includes(extension))

  // If the user explicitly set either extensions property to an empty array, then leave it alone.
  // Otherwise, assume default file extensions.
  if (extensions == null) {
    extensions = [...DEFAULT_MARKDOWN_EXTENSIONS]
  }

  svelteConfig.preprocess ??= []

  svelteConfig.extensions = [
    ...svelteExtensions,
    ...extensions.filter((extension) => !svelteExtensions.includes(extension)),
  ]

  // Mutate the original Svelte config to ensure that it is an array.
  if (!Array.isArray(svelteConfig.preprocess)) {
    svelteConfig.preprocess = [svelteConfig.preprocess]
  }

  /**
   * Create a shallow copy of the current pre-processors in the Svelte config, i.e. excluding mdsx.
   *
   * @type import('svelte/compiler').PreprocessorGroup[]
   */
  const preprocessors = Array.isArray(svelteConfig.preprocess)
    ? [...svelteConfig.preprocess]
    : [svelteConfig.preprocess]

  const mdsxPreprocessorConfig = {
    extensions,
    preprocessors,
    ...mdsxConfig,
  }

  const mdsxPreprocessor = createMdsxPreprocessor(mdsxPreprocessorConfig)

  // Add the mdsx preprocessor to the Svelte config.
  svelteConfig.preprocess.push(mdsxPreprocessor)

  return svelteConfig
}

export default withMdsx
