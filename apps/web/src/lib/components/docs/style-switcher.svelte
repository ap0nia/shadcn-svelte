<script lang="ts">
  import type { WithElementRef, WithoutChildren } from 'bits-ui'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  import { config, styles } from '$lib/stores/config'
  import * as Select from '$lib/components/ui/select'

  type PrimitiveButtonAttributes = WithElementRef<HTMLButtonAttributes>

  let props: WithoutChildren<Omit<PrimitiveButtonAttributes, 'style' | 'id'>> = $props()

  const styleLabel = $derived(styles.filter((s) => s.name === $config.style)[0]?.label)

  let value = $state($config.style)

  $effect(() => {
    config.update((prev) => ({ ...prev, style: value }))
  })
</script>

<Select.Root type="single" bind:value>
  <Select.Trigger {...props}>
    <span>Style:</span>
    <span>{styleLabel}</span>
  </Select.Trigger>

  <Select.Content>
    {#each styles as style (style.name)}
      <Select.Item value={style.name} label={style.label} class="text-xs" />
    {/each}
  </Select.Content>
</Select.Root>
