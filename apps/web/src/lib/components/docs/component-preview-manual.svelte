<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import ThemeSelect from '$lib/components/shadcn-theme-select.svelte'
  import ThemeWrapper from '$lib/components/shadcn-theme-wrapper.svelte'
  import { config } from '$lib/stores/config'
  import { cn } from '$lib/utils/cn'

  let {
    class: className,
    align = 'center',
    type = 'example',
    title,
    name,
    children,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    align?: 'center' | 'start' | 'end'
    type?: 'block' | 'component' | 'example'
    name?: string
    title?: string
  } = $props()
</script>

{#if type === 'block'}
  <div class="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
    <img
      src={`/images/blocks/${name}.png`}
      alt={name}
      width={1440}
      height={900}
      class="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
    />
    <img
      src={`/images/blocks/${name}-dark.png`}
      alt={name}
      width={1440}
      height={900}
      class="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
    />
    <div class="bg-background absolute inset-0 hidden w-[1600px] md:block">
      <iframe {title} src={`/blocks/${$config.style}/${name}`} class="size-full"></iframe>
    </div>
  </div>
{:else}
  <div class={cn('group relative my-4 flex flex-col space-y-2', className)} {...restProps}>
    <div class="relative mr-auto w-full">
      <div class="relative rounded-md border">
        <div class="flex items-center justify-between p-4">
          <ThemeSelect />
        </div>
        <ThemeWrapper defaultTheme="zinc">
          <div
            class={cn(
              'preview flex min-h-[350px] w-full justify-center p-10',
              {
                'items-center': align === 'center',
                'items-start': align === 'start',
                'items-end': align === 'end',
              },
              className,
            )}
          >
            {@render children?.()}
          </div>
        </ThemeWrapper>
      </div>
    </div>
  </div>
{/if}
