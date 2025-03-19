<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs'
  import { PersistedState } from 'runed'

  let props = $props()

  const triggers: string[] = $derived(props.triggers.split(' '))

  const value = new PersistedState(props.groupId, 'yarn', {
    serializer: {
      serialize: (value) => value || '',
      deserialize: (value) => value,
    },
  })

  const count = new PersistedState("count", 0);

  $inspect('TAB PROPS', value.current)
</script>
<div>
	<button onclick={() => count.current++}>Increment</button>
	<button onclick={() => count.current--}>Decrement</button>
	<button onclick={() => (count.current = 0)}>Reset</button>
	<p>Count: {count.current}</p>
</div>
  <Tabs.Root
    value={value.current}
    onValueChange={(a) => {
      value.current = a
    }}
    class="min-w-md"
  >
    <Tabs.List>
      {#each triggers as trigger (trigger)}
        <Tabs.Trigger value={trigger}>{trigger}</Tabs.Trigger>
      {/each}
    </Tabs.List>

    {@render props.children?.()}
  </Tabs.Root>
