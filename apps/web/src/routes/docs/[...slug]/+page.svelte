<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<main>
  {#if data.component}
    <data.component />
  {:else}
    <h1>{data.slug}</h1>
  {/if}
</main>
