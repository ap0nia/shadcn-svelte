<script lang="ts" module>
  import { type VariantProps, tv } from 'tailwind-variants'

  export const alertVariants = tv({
    base: '[&>svg]:absolute  [&>svg~*]:pl-7',
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  })

  export type AlertVariant = VariantProps<typeof alertVariants>['variant']
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { WithElementRef } from 'bits-ui'
  import { cn } from '$lib/utils/cn'

  let {
    ref = $bindable(null),
    class: className,
    variant = 'default',
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: AlertVariant
  } = $props()
</script>

<div
  bind:this={ref}
  class={cn(
    'relative block',
    '[&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg~*]:pl-7',
    className,
  )}
  {...restProps}
  role="alert"
>
  {@render children?.()}
</div>
