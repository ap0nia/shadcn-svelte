import type { EntryGenerator, PageLoad } from './$types'

const modules = import.meta.glob('/src/lib/content/**/*.md')

export const load: PageLoad = async (event) => {
  const slug = event.params.slug

  const markdownModuleKey = Object.keys(modules).find((key) => {
    const moduleSlug = key.replace('/src/lib/content/docs/', '').replace('.md', '')
    return moduleSlug == slug
  })

  if (markdownModuleKey == null) {
    return {
      slug,
    }
  }

  const importModule = modules[markdownModuleKey]

  if (importModule == null) {
    return {
      slug,
    }
  }

  const exports: any = await importModule()

  const component = exports.default

  return {
    component,
    slug,
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
