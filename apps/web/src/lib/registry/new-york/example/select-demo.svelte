<!-- prettier-ignore -->
<script lang="ts" module>
// @paths: { "$lib/*": ["./src/lib/*"], "$server": ["./src/server"], "$server/*": ["./src/server/*"] }
// @filename: src/lib/registry/default/ui/select/index.ts
// @errors: 2353

import { Select as SelectPrimitive } from 'bits-ui'

const { Root, Trigger, Content, Group, GroupHeading, Item } = SelectPrimitive

export { Root, Trigger, Content, Group, GroupHeading, Item }

// @filename: src/routes/+page.ts
// ---cut---
</script>

<script lang="ts">
  import * as Select from '$lib/registry/new-york/ui/select'

  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
  ]

  let value = $state('')

  const triggerContent = $derived(fruits.find((f) => f.value === value)?.label ?? 'Select a fruit')
</script>

<Select.Root type="single" name="favoriteFruit" bind:value>
  <Select.Trigger class="w-[180px]">
    {triggerContent}
  </Select.Trigger>

  <Select.Content portalProps={{ disabled: true }}>
    <Select.Group>
      <Select.GroupHeading>Fruits</Select.GroupHeading>
      {#each fruits as fruit (fruit.value)}
        <Select.Item value={fruit.value} label={fruit.label} />
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
