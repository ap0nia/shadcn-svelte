<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte'
  import * as Alert from '$lib/registry/new-york/ui/alert'

  let {
    icon,
    title,
    children,
    ...restProps
  }: ComponentProps<(typeof Alert)['Root']> & {
    icon?: Snippet
    title?: Snippet
  } = $props()
</script>

<Alert.Root {...restProps} class="mt-2 py-0">
  {#if icon}
    <span class="mr-4 text-2xl">
      {@render icon?.()}
    </span>
  {/if}

  <Alert.Title>
    {@render title?.()}
  </Alert.Title>

  <Alert.Description>
    {@render children?.()}
  </Alert.Description>
</Alert.Root>
