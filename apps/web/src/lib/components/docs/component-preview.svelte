<script lang="ts">
  import type { WithElementRef } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  import * as Tabs from '$lib/components/ui/tabs'
  import { config } from '$lib/stores/config'
  import { cn } from '$lib/utils/cn'

  import StyleSwitcher from './style-switcher.svelte'

  type PrimitiveDivAttributes = WithElementRef<HTMLAttributes<HTMLDivElement>>

  const defaultExamples = import.meta.glob('/src/lib/registry/default/example/*.svelte')

  const newYorkExamples = import.meta.glob('/src/lib/registry/new-york/example/*.svelte')

  const defaultExamplesRaw = import.meta.glob('/src/lib/registry/default/example/*.svelte', {
    query: '?raw',
  })

  const newYorkExamplesRaw = import.meta.glob('/src/lib/registry/new-york/example/*.svelte', {
    query: '?raw',
  })

  const examples = {
    default: defaultExamples,
    'new-york': newYorkExamples,
  }

  const examplesRaw = {
    default: defaultExamplesRaw,
    'new-york': newYorkExamplesRaw,
  }

  let {
    name,
    align = 'center',
    class: className,
    example,
    children,
    form,
    style,
    ...restProps
  }: Omit<PrimitiveDivAttributes, 'style' | 'form'> & {
    name: string
    align?: 'center' | 'start' | 'end'
    style?: keyof typeof examples
    form?: unknown
    example?: Snippet
  } = $props()

  const component = $derived.by(() => {
    const s = style || $config.style

    const resolvedName = ['', 'src', 'lib', 'registry', s, 'example', `${name}.svelte`].join('/')

    const example = examples[s][resolvedName]

    return example
  })

  const componentRaw = $derived.by(() => {
    const s = style || $config.style

    const resolvedName = ['', 'src', 'lib', 'registry', s, 'example', `${name}.svelte`].join('/')

    const example = examplesRaw[s][resolvedName]

    return example
  })
</script>

{#snippet ExampleFallback()}
  {#if component}
    {#await component()}
      <div class="text-muted-foreground flex items-center text-sm">
        <!-- <Icon.Spinner class="mr-2 size-4 animate-spin" /> -->
        Loading...
      </div>
    {:then mod}
      {@render mod.default()}
    {:catch}
      <p class="text-muted-foreground text-sm">
        Component
        <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>
        not found in registry.
      </p>
    {/await}
  {/if}
{/snippet}

<div class={cn('group relative my-4 flex flex-col space-y-2', className)} {...restProps}>
  <Tabs.Root value="preview" class="relative mr-auto w-full">
    <div class="flex items-center justify-between pb-3">
      <Tabs.List class="w-full justify-start rounded-none border-b bg-transparent p-0">
        <Tabs.Trigger
          value="preview"
          class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
        >
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger
          value="code"
          class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
        >
          Code
        </Tabs.Trigger>
      </Tabs.List>
    </div>

    <Tabs.Content value="preview" class="relative rounded-md border">
      <div class="flex items-center justify-between p-4">
        <StyleSwitcher />
      </div>

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
        {style}
      >
        {#if example}
          {@render example()}
        {:else}
          {@render ExampleFallback()}
        {/if}
      </div>

      <!--
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
          {style}
        >
          {#if example}
            {@render example()}
          {:else}
            {@render ExampleFallback()}
          {/if}
        </div>
      </ThemeWrapper>
      -->
    </Tabs.Content>

    <Tabs.Content value="code">
      <div data-style={$config.style} class="space-y-2 p-2">
        <StyleSwitcher />

        {@render children?.()}
      </div>

      <!--
      <ThemeWrapper defaultTheme="zinc">
        <div class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
          {@render children?.()}
        </div>
      </ThemeWrapper>
      -->
    </Tabs.Content>
  </Tabs.Root>
</div>
