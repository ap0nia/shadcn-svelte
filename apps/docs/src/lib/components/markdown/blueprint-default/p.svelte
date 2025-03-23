<script lang="ts">
  import { cn } from '$lib/utils/cn'
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, class: className, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props()
</script>

<p {...restProps} class={cn('leading-[1.65rem] [&:not(:first-child)]:mt-6', className)}>
  {@render children?.()}
</p>
