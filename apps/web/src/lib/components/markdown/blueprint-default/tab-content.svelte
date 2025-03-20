<script lang="ts">
  import type { Snippet } from 'svelte'

  import * as Tabs from '$lib/registry/new-york/ui/tabs'

  type Props = {
    value: string
    children?: Snippet
  }

  let props: Props = $props()
</script>

<Tabs.Content value={props.value}>
  {@render props.children?.()}
</Tabs.Content>
