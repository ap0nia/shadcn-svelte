<script lang="ts">
  import type { WithElementRef } from 'bits-ui'
  import { mode, theme } from 'mode-watcher'
  import { setContext, type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { writable } from 'svelte/store'

  import { setLocale, setMessages } from '$lib/i18n'
  import { getLocale } from '$lib/paraglide/runtime'
  import * as Tabs from '$lib/registry/new-york/ui/tabs'
  import { config, styles } from '$lib/stores/config'
  import { cn } from '$lib/utils/cn'

  import LanguageSelect from '../language-select.svelte'
  import StyleSwitcher from '../style-select.svelte'
  import ShadcnThemeSelect from '../shadcn-theme-select.svelte'
  import ThemeSelect from '../theme-select.svelte'
  import ThemeToggle from '../theme-toggle.svelte'

  type PrimitiveDivAttributes = WithElementRef<HTMLAttributes<HTMLDivElement>>

  const defaultExamples = import.meta.glob('/src/lib/registry/default/example/*.svelte')

  const newYorkExamples = import.meta.glob('/src/lib/registry/new-york/example/*.svelte')

  const daisyDefaultExamples = import.meta.glob('/src/lib/registry/daisy-default/example/*.svelte')

  const daisyNewYorkExamples = import.meta.glob('/src/lib/registry/daisy-new-york/example/*.svelte')

  let localTheme = $state($theme || null)

  let localMode = $state($mode || null)

  let themes = $state({ light: 'light', dark: 'dark' })

  const examples = {
    default: defaultExamples,
    'new-york': newYorkExamples,
    'daisy-default': daisyDefaultExamples,
    'daisy-new-york': daisyNewYorkExamples,
  }

  let {
    name,
    align = 'center',
    class: className,
    example,
    children,
    // form,
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

  const resolvedStyle = $derived(style || $config.style)

  const componentPath = $derived.by(() => {
    return ['', 'src', 'lib', 'registry', resolvedStyle, 'example', `${name}.svelte`].join('/')
  })

  const component = $derived.by(() => {
    const example = examples[resolvedStyle][componentPath]
    return example
  })

  /**
   * Experimental context that will synchronize the floating ui's portaled-contents
   * with the current mode and theme of the target container.
   * However, the twoslash CSS variables are already resolved, and do not react to
   * higher priority CSS variable declarations based on the theme.
   */
  setContext('FLOATING', {
    locale: $locale,
    get mode() {
      return localMode
    },
    get theme() {
      return localTheme
    },
  })

  const isDaisy = $derived($config.style.startsWith('daisy'))
</script>

{#snippet Empty()}
  <p class="text-base-content/70 grow-0 text-sm">
    <span>Component</span>

    <code class="badge badge-sm">
      {name}
    </code>

    <span>component not found in {resolvedStyle} registry.</span>
  </p>
{/snippet}

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
      {@render Empty()}
    {/await}
  {:else}
    {@render Empty()}
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

    <div class="relative space-y-2 p-2">
      <div class="flex items-center gap-2 p-1">
        <StyleSwitcher />

        <LanguageSelect {locale} />

        {#if $config.style === 'default' || $config.style === 'new-york'}
          <ShadcnThemeSelect />
        {:else}
          <ThemeSelect bind:theme={localTheme} bind:mode={localMode} bind:themes local />
        {/if}

        <ThemeToggle bind:mode={localMode} bind:theme={localTheme} {themes} local />
      </div>

      <div
        class={cn(
          'flex min-h-100 flex-col p-2',
          localMode === 'dark' ? 'dark' : 'light',
          !isDaisy && `theme-${$config.theme}`,
          'card',
          'preview-container overflow-hidden border shadow-sm',
        )}
        data-style={resolvedStyle}
        data-theme={isDaisy ? localTheme : undefined}
        lang={$locale}
        dir={$messages.__direction() as any}
      >
        <Tabs.Content
          value="preview"
          class={cn(
            'card-body',
            'preview flex h-full w-full justify-center',
            {
              'items-center': align === 'center',
              'items-start': align === 'start',
              'items-end': align === 'end',
            },
            className,
          )}
        >
          {#if example}
            {@render example()}
          {:else}
            {@render ExampleFallback()}
          {/if}
        </Tabs.Content>

        <Tabs.Content
          value="code"
          class={cn(
            'card-body',
            'source-code',
            'preview flex h-full w-full justify-center',
            {
              'items-center': align === 'center',
              'items-start': align === 'start',
              'items-end': align === 'end',
            },
            className,
          )}
        >
          {#if children}
            {@render children()}
          {/if}

          <!-- The child code blocks are added at compile time. -->
          <!-- It may have either code block rendered, with a data-style property. -->
          <!-- Use a CSS selector to render the placeholder when the corresponding code block doesn't exist. -->
          {#each styles as style (style.name)}
            <p
              class="text-base-content/70 code-placeholder hidden grow-0 text-sm"
              data-style={style.name}
            >
              <span>Code for</span>

              <code class="badge badge-sm">
                {name}
              </code>

              <span>component not found in {style.label} registry.</span>
            </p>
          {/each}
        </Tabs.Content>
      </div>
    </div>
  </Tabs.Root>
</div>

<style lang="postcss">
  .preview-container[data-style='default'] {
    &:not(:has(div[data-style='default'])) {
      .code-placeholder[data-style='default'] {
        display: block !important;
      }
    }
  }

  .preview-container[data-style='new-york'] {
    &:not(:has(div[data-style='new-york'])) {
      .code-placeholder[data-style='new-york'] {
        display: block !important;
      }
    }
  }

  .preview-container[data-style='daisy-default'] {
    &:not(:has(div[data-style='daisy-default'])) {
      .code-placeholder[data-style='daisy-default'] {
        display: block !important;
      }
    }
  }

  .preview-container[data-style='daisy-new-york'] {
    &:not(:has(div[data-style='daisy-new-york'])) {
      .code-placeholder[data-style='daisy-new-york'] {
        display: block !important;
      }
    }
  }

  :global {
    [data-style='new-york'] {
      [data-style='default'],
      [data-style='daisy-default'],
      [data-style='daisy-new-york'] {
        display: none;
      }
    }

    [data-style='default'] {
      [data-style='new-york'],
      [data-style='daisy-default'],
      [data-style='daisy-new-york'] {
        display: none;
      }
    }

    [data-style='daisy-default'] {
      [data-style='default'],
      [data-style='new-york'],
      [data-style='daisy-new-york'] {
        display: none;
      }
    }

    [data-style='daisy-new-york'] {
      [data-style='default'],
      [data-style='new-york'],
      [data-style='daisy-default'] {
        display: none;
      }
    }
  }
</style>
