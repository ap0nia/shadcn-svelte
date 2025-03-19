---
title: Select

description: Displays a list of options for the user to pick from—triggered by a button.

component: true

links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/select
  doc: https://next.bits-ui.com/docs/components/select
  api: https://next.bits-ui.com/docs/components/select#api-reference
---

<!-- prettier-ignore -->
<script>
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs'
  import ComponentPreview from '$lib/components/docs/component-preview.svelte'
</script>

<ComponentPreview name="select-demo">

</ComponentPreview>

## Installation

<Tabs value="cli">

<TabsList class="tabs-border tabs-xl border-b w-full mb-4">
<TabsTrigger value="cli">CLI</TabsTrigger>
<TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

```bash npm2yarn
npx shadcn-svelte@next add select
```

</TabsContent>

<TabsContent value="manual">

<ul class="steps steps-vertical !m-0 !p-0">

<li class="step step-primary !text-left">

<div class="w-full">

<h4 class="[&_p]:inline">
<span>Install</span>

`bits-ui`
</h4>

```bash npm2yarn
npx shadcn-svelte@next add select
```

</div>

</li>

<li class="step step-primary !text-left">
Copy and paste the component source files linked at the top of this page into your project.
</li>

</ul>

</TabsContent>

</Tabs>

## Usage

```svelte twoslash
<script lang="ts" module>
// @paths: { "$lib/*": ["./src/lib/*"], "$server": ["./src/server"], "$server/*": ["./src/server/*"] }
// @filename: src/lib/registry/default/ui/select/index.ts

import { Select as SelectPrimitive } from 'bits-ui'

const { Root, Trigger, Content, Group, GroupHeading, Item } = SelectPrimitive

export { Root, Trigger, Content, Group, GroupHeading, Item }

// @filename: src/routes/+page.ts
// ---cut---
</script>

<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js'
</script>

<Select.Root type="single">
  <Select.Trigger class="w-[180px]"></Select.Trigger>
  <Select.Content>
    <Select.Item value="light">Light</Select.Item>
    <Select.Item value="dark">Dark</Select.Item>
    <Select.Item value="system">System</Select.Item>
  </Select.Content>
</Select.Root>
```
