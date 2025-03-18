<script lang="ts">
  import { getMessages } from '$lib/i18n'
  import SvelteCounter from '$lib/markdown/svelte-counter.md'
  import ReactCounter from '$lib/markdown/react-counter.md'

  const messages = getMessages()
</script>

<main class="space-y-4 p-4">
  <h1>{$messages.hello()}</h1>

  <div class="mx-auto max-w-2xl space-y-2">
    <SvelteCounter />
    <ReactCounter />
  </div>
</main>
