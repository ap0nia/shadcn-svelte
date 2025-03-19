<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs'

  let props = $props()

  const triggers: string[] = $derived(props.triggers.split(' '))

  $inspect('TAB PROPS', props)
</script>

<Tabs.Root value="yarn" class="min-w-md">
  <Tabs.List>
    {#each triggers as trigger (trigger)}
      <Tabs.Trigger value={trigger}>{trigger}</Tabs.Trigger>
    {/each}
  </Tabs.List>

  {@render props.children?.()}
</Tabs.Root>
