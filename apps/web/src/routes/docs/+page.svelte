<script lang="ts">
  import Page from './[...slug]/+page.svelte'
  import type { PageProps } from './$types'
  let props: PageProps = $props()
</script>

<Page {...props} />
