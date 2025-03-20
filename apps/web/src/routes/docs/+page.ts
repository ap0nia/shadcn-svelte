import { error } from '@sveltejs/kit'

import type { PageLoad } from './$types.js'

export const load: PageLoad = async () => {
  const doc = await import('../../lib/content/docs/index.md')

  if (!doc || !doc.metadata) {
    error(404)
  }

  return {
    slug: '',
    component: doc.default,
    metadata: doc.metadata,
    title: doc.metadata.title,
  }
}
