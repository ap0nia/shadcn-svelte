<script lang="ts">
  import '../app.css'
  import 'virtual:group-icons.css'

  import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'

  import ThemeModeWatcher from '$lib/components/theme-mode-watcher.svelte'
  import { createObservableLocale, setLocale, setMessages } from '$lib/i18n'
  import { Toaster } from '$lib/registry/new-york/ui/sonner'

  import Footer from './footer.svelte'
  import Header from './header.svelte'

  let { children } = $props()

  useProsemirrorAdapterProvider()

  const locale = createObservableLocale()

  setLocale(locale)

  const messages = setMessages(locale)
</script>

<ThemeModeWatcher />
<Toaster dir={$messages.__direction() as any} />

<div class="flex min-h-dvh flex-col">
  <Header />

  <div class="contents">
    {@render children()}
  </div>
</div>

<div class="divider"></div>

<Footer />
