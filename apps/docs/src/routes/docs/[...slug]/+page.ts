import type { EntryGenerator, PageLoad } from './$types'

const modules = import.meta.glob('/src/content/**/*.md')

export const load: PageLoad = async (event) => {
  const slug = event.params.slug || 'index'

  if (slug.startsWith('changelog')) {
    const exports = await import('/CHANGELOG.md')

    const component = exports.default

    const metadata = exports.metadata

    const title = metadata.title

    return {
      component,
      slug,
      metadata,
      title,
    }
  }

  const slugMatches = [slug, slug + '/index']

  const markdownModuleKey = Object.keys(modules).find((key) => {
    const moduleSlug = key.replace('/src/content/docs/', '').replace('.md', '')
    return slugMatches.includes(moduleSlug)
  })

  if (markdownModuleKey == null) {
    return {
      slug,
      metadata: {
        title: slug,
      },
    }
  }

  const importModule = modules[markdownModuleKey]

  if (importModule == null) {
    return {
      slug,
      metadata: {
        title: slug,
      },
    }
  }

  const exports: any = await importModule()

  const component = exports.default

  const metadata = exports.metadata

  const title = metadata.title

  return {
    component,
    slug,
    metadata,
    title,
  }
}

export const entries: EntryGenerator = () => {
  console.info('Prerendering /docs')

  const entries = Object.keys(modules).map((path) => {
    const slug = path.replace('/src/content/', '').replace('.md', '').replace('/index', '')
    return { slug }
  })

  return entries
}
