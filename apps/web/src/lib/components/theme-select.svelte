<script lang="ts">
  import themes from 'daisyui/theme/object'
  import themeOrder from 'daisyui/functions/themeOrder'
  import { mode, setTheme, setMode, theme } from 'mode-watcher'

  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import * as Select from '$lib/components/ui/select'
  import { getMessages } from '$lib/i18n'
  import { cn } from '$lib/utils/cn'

  const messages = getMessages()

  function handleSelectedChange(newTheme: string) {
    const newMode = themes[newTheme]?.['color-scheme']

    if (!newMode) return

    /**
     * e.g. If the current mode is "light" and the theme is "cupcake", set light=cupcake.
     *
     * When toggling between dark/light mode, switch to cupcake instead of the
     * default light theme for light mode.
     */
    localStorage.setItem(newMode, newTheme)

    setTheme(newTheme)
    setMode(newMode as any)
  }
</script>

<!--
@component

Select input that can choose a specific theme.
Selecting a specific theme will persist it to localstorage under the "light" or "dark" key.
-->

<Select.Root type="single" onValueChange={handleSelectedChange} value={$theme || $mode}>
  <div data-tip={$messages.selectTheme()} class="tooltip tooltip-bottom">
    <Select.Trigger class="min-w-32">
      <span class="theme-select-label" data-placeholder={$messages.selectTheme()}>
        {$theme}
      </span>
    </Select.Trigger>
  </div>

  <Select.Content>
    <ScrollArea class="h-64">
      <Select.Group class="w-full p-0">
        {#each themeOrder as theme}
          {@const themeDetails = themes[theme]}

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
