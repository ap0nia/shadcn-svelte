import { derived, writable } from 'svelte/store'

import { m } from '$lib/paraglide/messages'

import { getLocale, overwriteSetLocale, setLocale } from './paraglide/runtime'

const originalSetLocale = setLocale

export const locale = writable(getLocale())

export const messages = derived(locale, ($locale) => {
  const resolvedMessages = Object.fromEntries(
    Object.keys(m).map((key) => {
      const resolver = (...args: Parameters<(typeof m)[keyof typeof m]>) => {
        const resolvedArgs: typeof args = [...args]

        resolvedArgs[1] = { locale: $locale, ...args[1] }

        return m[key as keyof typeof m](...resolvedArgs)
      }

      return [key, resolver]
    }),
  )

  return resolvedMessages as typeof m
})

overwriteSetLocale((newLocale, ...args) => {
  originalSetLocale(newLocale, ...args)
  locale.set(newLocale)
})

export default messages
