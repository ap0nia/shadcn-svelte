---
title: Select

description: Displays a list of options for the user to pick from—triggered by a button.

component: true

links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/select
  doc: https://next.bits-ui.com/docs/components/select
  api: https://next.bits-ui.com/docs/components/select#api-reference
---

<script>
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs'
    // import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs'
</script>

## Installation

<Tabs value="cli">

<TabsList class="tabs-xl tabs-border border-b w-full mb-2">
<TabsTrigger value="cli">CLI</TabsTrigger>
<TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

```bash npm2yarn
npx shadcn-svelte@next add select
```

</TabsContent>

<TabsContent value="manual">

<ul class="steps steps-vertical w-full p-0 !my-0">

<li class="step !text-left !my-0">

<div>

<span>Install</span> `bits-ui`

```bash npm2yarn
npm i bits-ui -D
```

</div>
</li>

  <li class="step !text-left !my-0">
    Copy and paste the component source files linked at the top of this page into your project.
  </li>
</ul>

</TabsContent>

</Tabs>

## Usage

```svelte twoslash
<script lang="ts" context="module">
// @paths: { "$lib/*": ["./src/lib/*"] }
// @filename: src/lib/components/ui/select/index.ts
import { Select } from from 'bits-ui'

export {
  Root: Select.Root,
  Trigger: Select.Trigger,
  Content: Select.Content,
  Item: Select.Item,
  Group: Select.Group,
  GroupHeading: Select.GroupHeading,
}
// @filename: src/routes/+page.ts
// ---cut---
</script>

<script lang="ts">
 import * as Select from "$lib/components/ui/select";
 
 const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" }
 ];
 
 let value = $state("");
 
 const triggerContent = $derived(
  fruits.find((f) => f.value === value)?.label ?? "Select a fruit"
 );
</script>
 
<Select.Root type="single" name="favoriteFruit" bind:value>
 <Select.Trigger class="w-[180px]">
  {triggerContent}
 </Select.Trigger>
 <Select.Content>
  <Select.Group>
   <Select.GroupHeading>Fruits</Select.GroupHeading>
   {#each fruits as fruit (fruit.value)}
    <Select.Item value={fruit.value} label={fruit.label}
     >{fruit.label}</Select.Item
    >
   {/each}
  </Select.Group>
 </Select.Content>
</Select.Root>
```
