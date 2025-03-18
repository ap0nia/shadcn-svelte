import type { Handle } from '@sveltejs/kit'

import { paraglideMiddleware } from '$lib/paraglide/server'

const paraglideHandle: Handle = ({ event, resolve }) => {
  return paraglideMiddleware(event.request, ({ locale }) => {
    return resolve(event, {
      transformPageChunk: (input) => {
        return input.html.replace('%lang%', locale)
      },
    })
  })
}

export const handle: Handle = paraglideHandle
