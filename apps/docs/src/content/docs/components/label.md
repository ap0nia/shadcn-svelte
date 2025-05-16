---
title: Label
description: Renders an accessible label associated with controls.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/label
  doc: https://bits-ui.com/docs/components/label
  api: https://bits-ui.com/docs/components/label#api-reference
---

<ComponentPreview name="label-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add label
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
  import { Label } from '$lib/components/ui/label/index.js'
</script>

<Label for="email">Your email address</Label>
```
