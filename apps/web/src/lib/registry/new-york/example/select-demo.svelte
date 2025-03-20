<script lang="ts">
  import * as Select from '$lib/registry/new-york/ui/select'

  let { messages } = $props()

  const fruits = $derived.by(() => {
    if (!messages) {
      return [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'blueberry', label: 'Blueberry' },
        { value: 'grapes', label: 'Grapes' },
        { value: 'pineapple', label: 'Pineapple' },
      ]
    }

    return [
      { value: 'apple', label: $messages.apple() },
      { value: 'banana', label: $messages.banana() },
      { value: 'blueberry', label: $messages.strawberry() },
      { value: 'grapes', label: $messages.blueberry() },
      { value: 'pineapple', label: $messages.kiwi() },
    ]
  })

  let value = $state('')

  const triggerContent = $derived.by(() => {
    const fruit = fruits.find((f) => f.value === value)

    if (fruit?.label) return fruit.label

    if (messages) return $messages.selectFruit()

    return 'Select a fruit'
  })
</script>

<Select.Root type="single" name="favoriteFruit" bind:value>
  <Select.Trigger class="w-[180px]">
    {triggerContent}
  </Select.Trigger>

  <Select.Content portalProps={{ disabled: true }}>
    <Select.Group>
      <Select.GroupHeading>
        {messages ? $messages.fruits() : 'Fruits'}
      </Select.GroupHeading>

      {#each fruits as fruit (fruit.value)}
        <Select.Item value={fruit.value} label={fruit.label} />
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
