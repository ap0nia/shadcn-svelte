<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<main class="h-full w-full overflow-y-auto p-4">
  <div class="prose prose-pre:my-0 prose-pre:bg-inherit prose-pre:py-0 prose-pre:px-0">
    {#if data.component}
      <data.component />
    {:else}
      <h1>{data.slug}</h1>
    {/if}
  </div>
</main>
