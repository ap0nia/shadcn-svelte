<script lang="ts">
  import { getLocale } from '$lib/i18n'
  import { localizeHref } from '$lib/paraglide/runtime'
  import { cn } from '$lib/utils/cn'

  let { class: className, href, children, ...restProps } = $props()

  const locale = getLocale()

  const localizedHref = $derived(localizeHref(href || '', { locale: $locale }))
</script>

<a
  href={localizedHref}
  class={cn('btn btn-outline h-auto flex-col gap-0 p-10', className)}
  {...restProps}
>
  {@render children?.()}
</a>
