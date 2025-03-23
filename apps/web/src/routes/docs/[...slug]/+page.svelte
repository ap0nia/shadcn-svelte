<script lang="ts">
  import { page } from '$app/state'
  import Pager from '$lib/components/docs/pager.svelte'
  import TableOfContents from '$lib/components/docs/table-of-contents.svelte'
  import { getLocale } from '$lib/i18n'
  import { locales, localizeHref } from '$lib/paraglide/runtime'
  import { ScrollArea } from '$lib/registry/new-york/ui/scroll-area'
  import { config } from '$lib/stores/config'
  import { cn } from '$lib/utils/cn'

  import SidebarMenu from '../../sidebar-menu.svelte'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  const Markdown = $derived(data.component)

  const doc = $derived(data.metadata)

  const componentSource = $derived(
    doc?.links?.source?.replace('default', $config.style ?? 'default'),
  )

  const apiLink = $derived(doc?.links?.api)

  const docLink = $derived(doc?.links?.doc)

  const locale = getLocale()

  const breadcrumbs = $derived.by(() => {
    const allBreadcrumbs = page.url.pathname
      .split('/')
      .filter(Boolean)
      .map((segment) => {
        return {
          segment,
          href: `/${segment}`,
          label: segment[0]?.toUpperCase() + segment.slice(1),
        }
      })
      .reduce(
        (previous, current) => {
          if (previous.length) {
            current.href = `${previous.at(-1)?.href}${current.href}`
          }

          return [...previous, current]
        },
        [] as Array<{ href: string; label: string; segment: string }>,
      )

    if (locales.includes(allBreadcrumbs[0]?.segment as any)) {
      allBreadcrumbs.splice(0, 1)
    }

    return allBreadcrumbs
  })
</script>

<div
  class="border-base-300 container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
>
  <aside class="fixed top-20 hidden h-[calc(100vh-8rem)] md:sticky md:block">
    <SidebarMenu />
  </aside>

  <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
    <div class="mx-auto w-full max-w-2xl min-w-0">
      <div>
        <div class="breadcrumbs text-sm">
          <ul>
            {#each breadcrumbs as breadcrumb (breadcrumb.href)}
              {@const href = localizeHref(breadcrumb.href, { locale: $locale })}

              <li>
                <a {href}>{breadcrumb.label}</a>
              </li>
            {/each}

            <li>{doc?.title}</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
            {doc?.title}
          </h1>

          {#if doc?.description}
            <p class="text-base-content/70 text-base text-balance">
              {doc.description}
            </p>
          {/if}
        </div>

        {#if apiLink || componentSource || docLink}
          <div class="flex items-center space-x-2 pt-4">
            {#if docLink}
              <a
                href={docLink}
                target="_blank"
                rel="noreferrer"
                class="badge badge-secondary badge-sm"
              >
                <span>Docs</span>
                <span class="icon-[mdi--external-link]"></span>
              </a>
            {/if}

            {#if apiLink}
              <a
                href={apiLink}
                target="_blank"
                rel="noreferrer"
                class="badge badge-secondary badge-sm"
              >
                <span>API Reference</span>
                <span class="icon-[mdi--external-link]"></span>
              </a>
            {/if}

            {#if componentSource}
              <a
                href={componentSource}
                target="_blank"
                rel="noreferrer"
                class="badge badge-secondary badge-sm"
              >
                <span>Component Source</span>
                <span class="icon-[mdi--code-tags]"></span>
              </a>
            {/if}
          </div>
        {/if}
      </div>

      <div
        id="markdown"
        class={cn(
          'pt-8 pb-12',
          'vp-doc prose prose-pre:my-0 prose-pre:bg-inherit prose-pre:py-0 prose-pre:px-0 prose-pre:rounded-none max-w-none',
        )}
      >
        {#if typeof Markdown === 'function'}
          <Markdown />
        {/if}
      </div>

      <Pager />
    </div>

    <div class="relative sticky top-20 hidden h-[calc(100vh-8rem)] w-3xs shrink-0 text-sm xl:block">
      <ScrollArea class="h-full">
        {#key page.url.pathname}
          <TableOfContents />
        {/key}

        <!-- <Carbon /> -->
      </ScrollArea>
    </div>
  </main>
</div>
