<script lang="ts">
  import { getLocale } from '$lib/i18n'
  import { localizeHref } from '$lib/paraglide/runtime'
  import { config } from '$lib/stores/config'

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

  const docsHome = $derived.by(() => {
    return localizeHref('/docs', { locale: $locale })
  })
</script>

<main class="h-full w-full space-y-8">
  <div class="mx-auto w-full min-w-0">
    <div class="breadcrumbs text-sm">
      <ul>
        <li><a href={docsHome}>Docs</a></li>
        <li>{doc?.title}</li>
      </ul>
    </div>

    <div class="space-y-2">
      <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
        {doc?.title}
      </h1>

      {#if doc?.description}
        <p class="text-base-content/70 text-lg text-balance">
          {doc.description}
        </p>
      {/if}
    </div>

    {#if apiLink || componentSource || docLink}
      <div class="flex items-center space-x-2 pt-4">
        {#if docLink}
          <a href={docLink} target="_blank" rel="noreferrer" class="badge badge-secondary badge-sm">
            <span>Docs</span>
            <span class="icon-[mdi--external-link]"></span>
          </a>
        {/if}

        {#if apiLink}
          <a href={apiLink} target="_blank" rel="noreferrer" class="badge badge-secondary badge-sm">
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

  <div class="prose prose-pre:my-0 prose-pre:bg-inherit prose-pre:py-0 prose-pre:px-0">
    {#if typeof Markdown === 'function'}
      <Markdown />
    {/if}
  </div>
</main>
