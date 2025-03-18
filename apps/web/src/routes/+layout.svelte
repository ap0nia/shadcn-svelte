<script lang="ts">
  import '../app.css'

  import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'
  import { ModeWatcher } from 'mode-watcher'

  // import { Toaster } from '$lib/components/ui/sonner'

  // import Header from './header.svelte'

  let { children } = $props()

  useProsemirrorAdapterProvider()
</script>

<ModeWatcher />
<!-- <Toaster /> -->

<div class="flex min-h-dvh flex-col">
  <!-- <Header /> -->

  <div class="contents grow">
    {@render children()}
  </div>
</div>
