<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  import { cn } from '$lib/utils/cn'

  let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props()
</script>

<code class={cn('block px-4', className)} {...restProps}>{@render children?.()}</code>
