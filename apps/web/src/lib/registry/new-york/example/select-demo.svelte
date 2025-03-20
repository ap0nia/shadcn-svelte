<!-- prettier-ignore -->
<script lang="ts">
  import * as Select from '$lib/registry/new-york/ui/select'

// ---cut-start---
  let { messages } = $props()
// ---cut-end---
  const fruits = $derived.by(() => {
// ---cut-start---
    if (messages) {
      return [
        { value: 'apple', label: $messages.apple() },
        { value: 'banana', label: $messages.banana() },
        { value: 'blueberry', label: $messages.strawberry() },
        { value: 'grapes', label: $messages.blueberry() },
        { value: 'pineapple', label: $messages.pineapple() },
      ] as Array<{ value: string, label: string }>
    }
// ---cut-end---
    return [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'grapes', label: 'Grapes' },
      { value: 'pineapple', label: 'Pineapple' },
    ]
  })

  const heading = $derived.by(() => {
// ---cut-start---
    if (messages) return $messages.fruits() as string
// ---cut-end---
    return 'Fruits'
  })

  let value = $state('')

  const triggerContent = $derived.by(() => {
    const fruit = fruits.find((f) => f.value === value)
// ---cut-start---
    if (fruit?.label) return fruit.label

    if (messages) return $messages.selectFruit() as string

    return 'Select a fruit'
// ---cut-end---
    return fruit?.label
  })
</script>

<Select.Root type="single" name="favoriteFruit" bind:value>
  <Select.Trigger class="w-[180px]">
    {triggerContent}
  </Select.Trigger>

  <Select.Content portalProps={{ disabled: true }}>
    <Select.Group>
      <Select.GroupHeading>{heading}</Select.GroupHeading>

      {#each fruits as fruit (fruit.value)}
        <Select.Item value={fruit.value} label={fruit.label} />
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
