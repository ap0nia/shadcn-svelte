---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/toggle-group
  doc: https://bits-ui.com/docs/components/toggle-group
  api: https://bits-ui.com/docs/components/toggle-group#api-reference
---

<ComponentPreview name="toggle-group-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add toggle-group
```

{/snippet}
{#snippet manual()}
<Steps>

### Install `bits-ui`:

```bash npm2yarn
npm i -D bits-ui
```

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte notwoslash
<script lang="ts">
  import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js'
</script>

<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Examples

### Default

<ComponentPreview name="toggle-group-demo">

<div></div>

</ComponentPreview>

### Outline

<ComponentPreview name="toggle-group-outline">

<div></div>

</ComponentPreview>

### Single

<ComponentPreview name="toggle-group-single">

<div></div>

</ComponentPreview>

### Small

<ComponentPreview name="toggle-group-sm">

<div></div>

</ComponentPreview>

### Large

<ComponentPreview name="toggle-group-lg">

<div></div>

</ComponentPreview>

### Disabled

<ComponentPreview name="toggle-group-disabled">

<div></div>

</ComponentPreview>
