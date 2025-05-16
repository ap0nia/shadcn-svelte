---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/switch
  doc: https://bits-ui.com/docs/components/switch
  api: https://bits-ui.com/docs/components/switch#api-reference
---

<ComponentPreview name="switch-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add switch
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
  import { Switch } from '$lib/components/ui/switch/index.js'
</script>

<Switch />
```

## Examples

### Form

<ComponentPreview name="switch-form">

<div></div>

</ComponentPreview>
