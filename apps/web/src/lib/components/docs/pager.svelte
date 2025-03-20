<script lang="ts" module>
  import type { Component } from 'svelte'

  export type NavItem = {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: Component
    label?: string
  }

  export type SidebarNavItem = NavItem & {
    items: SidebarNavItem[]
  }

  export type NavItemWithChildren = NavItem & {
    items: NavItemWithChildren[]
  }
</script>

<script lang="ts">
  import { page } from '$app/state'
  import { docsConfig } from '$lib/config/docs'
  import { getLocale } from '$lib/i18n'
  import { localizeHref } from '$lib/paraglide/runtime'

  const locale = getLocale()

  function getPagerForDoc(slug?: string) {
    const flattenedLinks = [null, ...flatten(docsConfig.sidebar), null]

    let activeIndex: number

    if (!slug) {
      activeIndex = 1
    } else {
      activeIndex = flattenedLinks.findIndex((link) => `/docs/${slug}` === link?.href)
    }

    const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null

    const next = activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null
    return {
      prev,
      next,
    }
  }

  function flatten(links: NavItemWithChildren[]): NavItem[] {
    return links
      .reduce<NavItem[]>((flat, link) => {
        return flat.concat(link.items?.length ? flatten(link.items) : link)
      }, [])
      .filter((link) => !link?.disabled)
  }

  const pager = $derived(getPagerForDoc(page.params['slug']))
</script>

<div class="flex flex-row items-center justify-between">
  {#if pager?.prev?.href}
    {@const href = localizeHref(pager.prev.href, { locale: $locale })}

    <a {href} class="btn btn-outline gap-2">
      <span class="icon-[mdi--chevron-left] size-4"></span>
      {pager.prev.title}
    </a>
  {/if}

  {#if pager?.next?.href}
    {@const href = localizeHref(pager.next.href, { locale: $locale })}

    <a {href} class="btn btn-outline ml-auto gap-2">
      {pager.next.title}
      <span class="icon-[mdi--chevron-right] size-4"></span>
    </a>
  {/if}
</div>
