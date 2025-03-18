<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<main class="h-full w-full overflow-y-auto p-8">
  {#if data.component}
    <data.component />
  {:else}
    <h1>{data.slug}</h1>
  {/if}
</main>
