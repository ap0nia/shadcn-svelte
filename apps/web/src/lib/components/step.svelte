<script lang="ts">
  import type { WithChildren } from 'bits-ui'
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, ...restProps }: WithChildren<HTMLAttributes<HTMLHeadingElement>> = $props()
</script>

<h3
  class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
  data-toc-ignore
  {...restProps}
>
  {@render children?.()}
</h3>
