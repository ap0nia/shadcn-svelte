<script lang="ts">
  import type { WithElementRef } from 'bits-ui'
  import { mode, theme } from 'mode-watcher'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { writable } from 'svelte/store'

  import * as Tabs from '$lib/components/ui/tabs'
  import { setLocale, setMessages } from '$lib/i18n'
  import { getLocale } from '$lib/paraglide/runtime'
  import { config } from '$lib/stores/config'
  import { cn } from '$lib/utils/cn'

  import StyleSwitcher from './style-switcher.svelte'
  import ThemeSelect from '../theme-select.svelte'
  import ThemeToggle from '../theme-toggle.svelte'
  import LanguageSelect from '../language-select.svelte'

  type PrimitiveDivAttributes = WithElementRef<HTMLAttributes<HTMLDivElement>>

  const defaultExamples = import.meta.glob('/src/lib/registry/default/example/*.svelte')

  const newYorkExamples = import.meta.glob('/src/lib/registry/new-york/example/*.svelte')

  let localTheme = $state($theme || null)

  let localMode = $state($mode || null)

  let themes = $state({ light: 'light', dark: 'dark' })

  const examples = {
    default: defaultExamples,
    'new-york': newYorkExamples,
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

  const locale = writable(getLocale())

  setLocale(locale)

  const messages = setMessages(locale)

  const component = $derived.by(() => {
    const s = style || $config.style

    const resolvedName = ['', 'src', 'lib', 'registry', s, 'example', `${name}.svelte`].join('/')

    const example = examples[s][resolvedName]

    return example
  })
</script>

{#snippet ExampleFallback()}
  {#if component}
    {#await component()}
      <div class="text-base-content/70 flex items-center text-sm">
        <span class="loading loading-spinner"></span>
        <span>&nbsp;Loading...</span>
      </div>
    {:then mod}
      {@const Component = (mod as any).default}
      <Component {messages} />
    {:catch}
      <p class="text-base-content/70 text-sm">
        <span>Component</span>

        <code class="badge badge-sm">
          {name}
        </code>

        <span>not found in registry.</span>
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
          class="data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
        >
          Preview
        </Tabs.Trigger>

        <Tabs.Trigger
          value="code"
          class="data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
        >
          Code
        </Tabs.Trigger>
      </Tabs.List>
    </div>

    <Tabs.Content value="preview">
      <div class="relative space-y-2 p-2">
        <div class="flex items-center gap-2">
          <StyleSwitcher />
          <LanguageSelect {locale} />
          <ThemeSelect bind:theme={localTheme} bind:mode={localMode} bind:themes local />
          <ThemeToggle bind:mode={localMode} bind:theme={localTheme} {themes} local />
        </div>

        <div
          data-style={$config.style}
          data-theme={localTheme}
          lang={$locale}
          dir={$messages.__direction() as any}
          class={cn(
            localMode === 'dark' ? 'dark' : 'light',
            'rounded-md border',
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
      </div>
    </Tabs.Content>

    <Tabs.Content value="code">
      <div class="space-y-2 p-2">
        <div class="flex items-center gap-2">
          <StyleSwitcher />
          <LanguageSelect {locale} />
          <ThemeSelect bind:theme={localTheme} bind:mode={localMode} bind:themes local />
          <ThemeToggle bind:mode={localMode} bind:theme={localTheme} {themes} local />
        </div>

        <div
          data-style={$config.style}
          data-theme={localTheme}
          lang={$locale}
          dir={$messages.__direction() as any}
          class={localMode === 'dark' ? 'dark' : 'light'}
        >
          {@render children?.()}
        </div>
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
