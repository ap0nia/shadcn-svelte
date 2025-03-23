---
title: Alert
description: Displays a callout for user attention.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/alert
---

<script>
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/new-york/ui/tabs'
  import ComponentPreview from '$lib/components/docs/component-preview.svelte'
</script>

<ComponentPreview name="alert-demo">

</ComponentPreview>

## Installation

<Tabs value="cli">
  <TabsList class="tabs-border tabs-xl border-b w-full mb-4">
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

  <TabsContent value="cli">

```bash npm2yarn
npx shadcn-svelte@next add alert
```

  </TabsContent>

  <TabsContent value="manual">
    <ul class="steps steps-vertical">
<li class="step">

Install `bits-ui`

```bash npm2yarn
npx shadcn-svelte@next add alert
```

</li>
      <li class="step">
        Copy and paste the component source files linked at the top of this page into your project.
      </li>
    </ul>
  </TabsContent>
</Tabs>

## Usage

```svelte
<script lang="ts">
  import * as Alert from '$lib/registry/new-york/ui/alert'
</script>

<Alert.Root>
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>You can add components to your app using the cli.</Alert.Description>
</Alert.Root>
```

## Examples

### Default

<ComponentPreview name="alert-demo">

</ComponentPreview>

### Destructive

<ComponentPreview name="alert-destructive">

</ComponentPreview>
