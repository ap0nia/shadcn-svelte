<script lang="ts">
  import { mode, setTheme, toggleMode } from 'mode-watcher'

  import { getMessages } from '$lib/i18n'
  import { cn } from '$lib/utils/cn'

  type Props = {
    class?: string
  }

  let props: Props = $props()

  const messages = getMessages()

  function toggleTheme() {
    toggleMode()

    /**
     * The current mode, with default being 'light'.
     */
    const currentMode = $mode ?? 'light'

    /**
     * See if a more specific theme can be found by using the current mode.
     */
    const theme = localStorage.getItem(currentMode) ?? currentMode

    setTheme(theme)
  }
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
    <span class="swap swap-rotate" class:swap-active={$mode === 'dark'}>
      <span
        class={cn(
          'icon-[mdi--moon-waxing-crescent] swap-on size-5',

          // $mode is undefined on the server and thus on mount.
          // Before it's mounted for the first time, force the dark icon to be static.
          !$mode && 'dark:!rotate-0 dark:!opacity-100',
        )}
      ></span>
      <span class="icon-[mdi--weather-sunny] swap-off size-5 dark:opacity-0"></span>
    </span>
  </button>
</div>
