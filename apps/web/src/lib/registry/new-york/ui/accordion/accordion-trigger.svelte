<script lang="ts">
  import { Accordion as AccordionPrimitive, type WithoutChild } from 'bits-ui'
  import { cn } from '$lib/utils/cn'

  let {
    ref = $bindable(null),
    class: className,
    level = 3,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.TriggerProps> & {
    level?: AccordionPrimitive.HeaderProps['level']
  } = $props()
</script>

<AccordionPrimitive.Header {level} class="flex">
  <AccordionPrimitive.Trigger
    bind:ref
    class={cn(
      'flex flex-1 cursor-pointer items-center justify-between py-4',
      'text-sm font-medium transition-all hover:underline [&[data-state=open]>span[class^=icon]]:rotate-180',
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    <span
      class="icon-[mdi--chevron-down] text-base-content/70 size-4 shrink-0 transition-transform duration-200"
    ></span>
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
