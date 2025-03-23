<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  let props: HTMLAttributes<HTMLImageElement> = $props()
</script>

<img {...props} />
