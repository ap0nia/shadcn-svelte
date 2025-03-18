<script lang="ts">
  import SvelteCounter from '$lib/markdown/svelte-counter.md'
  import ReactCounter from '$lib/markdown/react-counter.md'
</script>

<main class="space-y-4 p-4">
  <h1>Hello, World!</h1>

  <div class="mx-auto max-w-2xl space-y-2">
    <SvelteCounter />
    <ReactCounter />
  </div>
</main>
