<script lang="ts">
  import { mode as globalMode, setTheme, theme as globalTheme, setMode } from 'mode-watcher'

  import { getMessages } from '$lib/i18n'
  import { cn } from '$lib/utils/cn'
  import type { Readable } from 'svelte/store'

  type ReadableValue<T> = T extends Readable<infer U> ? U : never

  type Props = {
    class?: string
    value?: ReadableValue<typeof globalMode>
    local?: boolean
    theme?: string
    themes?: Record<string, string>
  }

  let {
    value = $bindable($globalMode),
    theme = $bindable($globalTheme),
    themes,
    local = false,
    ...props
  }: Props = $props()

  const messages = getMessages()

  async function toggleTheme() {
    const newMode = value === 'dark' ? 'light' : 'dark'

    /**
     * See if a more specific theme can be found by using the current mode.
     */
    const newTheme = themes?.[newMode] || localStorage.getItem(newMode) || newMode

    if (local) {
      value = newMode
      theme = newTheme
    } else {
      setMode(newMode)
      setTheme(newTheme)
    }
  }

  $effect(() => {
    if (local) return

    theme = $globalTheme as any
    value = $globalMode as any
  })
</script>

<!--
@component

Button that toggles between light and dark mode.
It can also use specific themes specified by the 'light' and 'dark' keys from localstorage.
-->

<div data-tip={$messages.toggleTheme()} class={cn('tooltip tooltip-bottom', props.class)}>
  <button
    onclick={toggleTheme}
    class="btn btn-sm btn-square ring-base-content ring-1"
    aria-label="Color scheme toggle"
  >
    <span class="swap swap-rotate" class:swap-active={value === 'dark'}>
      <span
        class={cn(
          'icon-[mdi--moon-waxing-crescent] swap-on size-5',

          // $mode is undefined on the server and thus on mount.
          // Before it's mounted for the first time, force the dark icon to be static.
          !$globalMode && 'dark:!rotate-0 dark:!opacity-100',
        )}
      ></span>
      <span
        class={cn(!$globalMode && 'dark:opacity-0', 'icon-[mdi--weather-sunny] swap-off size-5')}
      ></span>
    </span>
  </button>
</div>
