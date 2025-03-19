<script lang="ts">
  import type { WithElementRef, WithoutChildren } from 'bits-ui'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  import { config, isStyle, styles } from '$lib/stores/config'
  import * as Select from '$lib/components/ui/select'
  import { cn } from '$lib/utils/cn'

  type PrimitiveButtonAttributes = WithElementRef<HTMLButtonAttributes>

  let {
    class: className,
    ...restProps
  }: WithoutChildren<Omit<PrimitiveButtonAttributes, 'style' | 'id'>> = $props()

  const styleLabel = $derived(styles.filter((s) => s.name === $config.style)[0]?.label)

  let value = $state($config.style)

  $effect(() => {
    config.update((prev) => ({ ...prev, style: value }))
  })
</script>

<Select.Root
  type="single"
  bind:value={
    () => value,
    (v) => {
      if (!isStyle(v)) return
      value = v
    }
  }
>
  <Select.Trigger class={cn('h-7 w-[145px] text-xs [&_svg]:size-4', className)} {...restProps}>
    <span class="text-muted-foreground">Style: </span>
    {styleLabel}
  </Select.Trigger>

  <Select.Content>
    {#each styles as style (style.name)}
      <Select.Item value={style.name} label={style.label} class="text-xs" />
    {/each}
  </Select.Content>
</Select.Root>
