---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/checkbox
  doc: https://bits-ui.com/docs/components/checkbox
  api: https://bits-ui.com/docs/components/checkbox#api-reference
---

<ComponentPreview name="checkbox-demo">

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add checkbox
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
  import { Checkbox } from '$lib/components/ui/checkbox/index.js'
</script>
```

```svelte notwoslash
<Checkbox />
```

## Examples

### With Text

<ComponentPreview name="checkbox-with-text">

</ComponentPreview>

### Disabled

<ComponentPreview name="checkbox-disabled">

</ComponentPreview>

### Form

<ComponentPreview name="checkbox-form-single">

</ComponentPreview>

<ComponentPreview name="checkbox-form-multiple">

</ComponentPreview>
