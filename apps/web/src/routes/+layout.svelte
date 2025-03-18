<script lang="ts">
  import '../app.css'

  import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'

  import { createObservableLocale, setLocale, setMessages } from '$lib/i18n'
  import ThemeModeWatcher from '$lib/components/theme-mode-watcher.svelte'
  // import { Toaster } from '$lib/components/ui/sonner'

  // import Header from './header.svelte'

  let { children } = $props()

  useProsemirrorAdapterProvider()

  const locale = createObservableLocale()

  setLocale(locale)

  setMessages(locale)
</script>

<ThemeModeWatcher />
<!-- <Toaster /> -->

<div class="flex min-h-dvh flex-col">
  <!-- <Header /> -->

  <div class="contents grow">
    {@render children()}
  </div>
</div>
