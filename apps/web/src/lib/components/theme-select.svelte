<script lang="ts">
  import globalThemes from 'daisyui/theme/object'
  import themeOrder from 'daisyui/functions/themeOrder'
  import { mode as globalMode, setTheme, setMode, theme as globalTheme } from 'mode-watcher'
  import type { Readable } from 'svelte/store'

  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import * as Select from '$lib/components/ui/select'
  import { getMessages } from '$lib/i18n'
  import { cn } from '$lib/utils/cn'

  type ReadableValue<T> = T extends Readable<infer U> ? U : never

  type Props = {
    class?: string
    theme?: string
    themes?: Record<string, string>
    mode?: ReadableValue<typeof globalMode>
    local?: boolean
  }

  let {
    theme = $bindable($globalTheme),
    mode = $bindable($globalMode),
    themes = $bindable({}),
    local = false,
    ...props
  }: Props = $props()

  const messages = getMessages()

  function handleSelectedChange(newTheme: string) {
    const newMode = globalThemes[newTheme]?.['color-scheme']

    /**
     * e.g. If the current mode is "light" and the theme is "cupcake", set light=cupcake.
     *
     * When toggling between dark/light mode, switch to cupcake instead of the
     * default light theme for light mode.
     */
    if (newMode) {
      if (local) {
        themes[newMode] = newTheme
      } else {
        localStorage.setItem(newMode, newTheme)
      }
    }

    if (local) {
      theme = newTheme
      mode = newMode as any
    } else {
      setTheme(newTheme)
      setMode(newMode as any)
    }
  }

  $effect(() => {
    if (local) return

    theme = $globalTheme as any
    mode = $globalMode as any
  })
</script>

<!--
@component

Select input that can choose a specific theme.
Selecting a specific theme will persist it to localstorage under the "light" or "dark" key.
-->

<Select.Root type="single" onValueChange={handleSelectedChange} value={theme}>
  <div data-tip={$messages.selectTheme()} class={cn('tooltip tooltip-bottom', props.class)}>
    <Select.Trigger>
      <span class="theme-select-label" data-placeholder={$messages.selectTheme()}>
        {theme}
      </span>
    </Select.Trigger>
  </div>

  <Select.Content>
    <ScrollArea class="h-64 pr-3">
      <Select.Group class="w-full">
        {#each themeOrder as theme}
          {@const themeDetails = globalThemes[theme]}

          <Select.Item value={theme} label={theme}>
            <div
              data-theme={theme}
              class="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm"
            >
              <div class="bg-base-content size-1 rounded-full"></div>
              <div class="bg-primary size-1 rounded-full"></div>
              <div class="bg-secondary size-1 rounded-full"></div>
              <div class="bg-accent size-1 rounded-full"></div>
            </div>

            <span class="grow">
              {theme}
            </span>

            <span
              class={cn(
                themeDetails?.['color-scheme'] === 'dark'
                  ? 'icon-[mdi--moon-waxing-crescent]'
                  : 'icon-[mdi--weather-sunny]',
              )}
            ></span>
          </Select.Item>
        {/each}
      </Select.Group>
    </ScrollArea>
  </Select.Content>
</Select.Root>

<style>
  /** If label is empty, use the data-theme variable on the HTML tag as the content. */
  .theme-select-label:empty::before {
    content: var(--data-theme, attr(data-placeholder));
  }
</style>
