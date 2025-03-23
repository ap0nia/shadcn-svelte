<script lang="ts">
  import { NavigationMenu as NavigationMenuPrimitive, type WithoutChild } from 'bits-ui'

  import { cn } from '$lib/utils/cn'

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<NavigationMenuPrimitive.ContentProps> = $props()
</script>

<NavigationMenuPrimitive.Content
  class={cn(
    'absolute top-0 left-0 w-full opacity-100 sm:w-auto',
    'transition-[all,transform_250ms_ease] duration-200',

    'data-[state=hidden]:opacity-0',
    'data-[state=hidden]:animate-fadeOut',
    'data-[state=visible]:animate-fadeIn',

    'data-[motion=from-end]:animate-enter-from-right',
    'data-[motion=from-start]:animate-enter-from-left',
    'data-[motion=to-end]:animate-exit-to-right',
    'data-[motion=to-start]:animate-exit-to-left',
  )}
  {...restProps}
>
  {@render children?.()}
</NavigationMenuPrimitive.Content>
