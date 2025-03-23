<script lang="ts">
  import type { WithChildren } from 'bits-ui'
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, ...restProps }: WithChildren<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<div
  class="[&>h3]:step steps-vertical steps mb-12 ml-4 border-l pl-12 [counter-reset:step]"
  {...restProps}
>
  {@render children?.()}
</div>
