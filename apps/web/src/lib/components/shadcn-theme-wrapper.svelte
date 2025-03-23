<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { config } from '$lib/stores/config'
  import { cn } from '$lib/utils/cn'

  let {
    class: className,
    defaultTheme,
    children,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & { defaultTheme?: string } = $props()
</script>

<div
  class={cn(`theme-${defaultTheme || $config.theme}`, 'w-full', className)}
  data-style={$config.style}
  style="--radius: {defaultTheme ? 0.5 : $config.radius}rem"
  {...restProps}
>
  {@render children?.()}
</div>
