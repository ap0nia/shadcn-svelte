<script lang="ts">
  import type { WithElementRef, WithoutChildren } from 'bits-ui'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  import { config, styles } from '$lib/stores/config'
  import * as Select from '$lib/registry/new-york/ui/select'

  type PrimitiveButtonAttributes = WithElementRef<HTMLButtonAttributes>

  let props: WithoutChildren<Omit<PrimitiveButtonAttributes, 'style' | 'id'>> = $props()

  const styleLabel = $derived(styles.filter((s) => s.name === $config.style)[0]?.label)
</script>

<Select.Root type="single" bind:value={$config.style}>
  <Select.Trigger {...props} class="w-32">
    <span class="truncate">{styleLabel}</span>
  </Select.Trigger>

  <Select.Content>
    {#each styles as style (style.name)}
      <Select.Item value={style.name} label={style.label} class="text-xs" />
    {/each}
  </Select.Content>
</Select.Root>
