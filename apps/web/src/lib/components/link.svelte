<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import { getLocale } from '$lib/i18n'
  import { localizeHref } from '$lib/paraglide/runtime'
  import { cn } from '$lib/utils/cn'

  let { children, class: className, href, ...props }: HTMLAnchorAttributes = $props()

  const locale = getLocale()

  const localizedHref = localizeHref(href || '', { locale: $locale })
</script>

<a {...props} href={localizedHref} class={cn('font-medium underline underline-offset-4', className)}>
  {@render children?.()}
</a>
