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
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/new-york/ui/tabs'
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
    <ul class="steps steps-vertical">

<li class="step">

Install `bits-ui`

```bash npm2yarn
npx shadcn-svelte@next add select
```

</li>
      <li class="step">
        Copy and paste the component source files linked at the top of this page into your project.
      </li>
    </ul>
  </TabsContent>
</Tabs>

## Usage

```svelte twoslash
<script lang="ts">
  import * as Select from '$lib/registry/new-york/ui/select'
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
