<script lang="ts">
  import type { Snippet } from 'svelte'

  import * as Tabs from '$lib/registry/new-york/ui/tabs'

  let { cli, manual }: { cli?: Snippet; manual?: Snippet } = $props()
</script>

<Tabs.Root value="cli">
  <Tabs.List class="tabs-border border-b">
    <Tabs.Trigger value="cli">CLI</Tabs.Trigger>
    <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="cli">
    {@render cli?.()}
  </Tabs.Content>

  <Tabs.Content
    value="manual"
    class="[&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
  >
    {@render manual?.()}
  </Tabs.Content>
</Tabs.Root>
