import { derived, writable } from 'svelte/store'

import { goto } from '$app/navigation'
import { m } from '$lib/paraglide/messages'
import { getLocale, localizeUrl, setLocale } from '$lib/paraglide/runtime'

function createObservableLocale() {
  const locale = writable(getLocale())

  const originalSetLocale = locale.set

  const extendedSetLocale: typeof setLocale = async (newLocale, ...args) => {
    setLocale(newLocale, ...args)
    originalSetLocale(newLocale)

    if (args[0]?.reload === false) {
      const newLocation = localizeUrl(window.location.href, {
        locale: newLocale,
      })

      goto(newLocation, { keepFocus: true, noScroll: true })
    }
  }

  return {
    ...locale,
    set: extendedSetLocale,
  }
}

export const locale = createObservableLocale()

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

export default messages
