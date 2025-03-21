---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/accordion
  doc: https://next.bits-ui.com/docs/components/accordion
  api: https://next.bits-ui.com/docs/components/accordion#api-reference
---

<script>
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/registry/new-york/ui/tabs'
  import ComponentPreview from '$lib/components/docs/component-preview.svelte'
</script>

<ComponentPreview name="accordion-demo" class="[&_[data-melt-accordion]]:sm:max-w-[70%]">

</ComponentPreview>

## Installation

<Tabs value="cli">
  <TabsList class="tabs-border tabs-xl border-b w-full mb-4">
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

  <TabsContent value="cli">

```bash npm2yarn
npx shadcn-svelte@next add accordion
```

  </TabsContent>

  <TabsContent value="manual">
    <ul class="steps steps-vertical">

<li class="step">

Install `bits-ui`

```bash npm2yarn
npx shadcn-svelte@next add accordion
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
  import * as Accordion from '$lib/registry/new-york/ui/accordion'
</script>

<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```
