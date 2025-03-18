<script lang="ts">
  import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui'
  import { cn } from '$lib/utils/cn'

  type SelectItemExtendedProps = {
    /**
     * Disable adding a checkbox next to the item.
     */
    noCheck?: boolean
  }

  let {
    ref = $bindable(null),
    class: className,
    value,
    label,
    children: childrenProp,
    noCheck,
    ...restProps
  }: WithoutChild<SelectPrimitive.ItemProps> & SelectItemExtendedProps = $props()
</script>

{#snippet child({ props, selected, highlighted }: any)}
  <li class="contents">
    <button {...props}>
      {@render childrenProp?.({ selected, highlighted })}
    </button>
  </li>
{/snippet}

<SelectPrimitive.Item
  bind:ref
  {value}
  class={cn('data-[disabled]:menu-disabled data-[highlighted]:menu-focus', className)}
  {child}
  {...restProps}
>
  {#snippet children({ selected, highlighted })}
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      {#if selected && !noCheck}
        <span class="icon-[mdi--check] size-4"></span>
      {/if}
    </span>

    {#if childrenProp}
      {@render childrenProp({ selected, highlighted })}
    {:else}
      {label || value}
    {/if}
  {/snippet}
</SelectPrimitive.Item>
