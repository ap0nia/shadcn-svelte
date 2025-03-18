<script lang="ts">
  import '../app.css'

  import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'

  import ThemeModeWatcher from '$lib/components/theme-mode-watcher.svelte'
  // import { Toaster } from '$lib/components/ui/sonner'

  // import Header from './header.svelte'

  let { children } = $props()

  useProsemirrorAdapterProvider()
</script>

<ThemeModeWatcher />
<!-- <Toaster /> -->

<div class="flex min-h-dvh flex-col">
  <!-- <Header /> -->

  <div class="contents grow">
    {@render children()}
  </div>
</div>
