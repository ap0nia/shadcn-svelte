---
title: Popover
description: Displays rich content in a portal, triggered by a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/popover
  doc: https://bits-ui.com/docs/components/popover
  api: https://bits-ui.com/docs/components/popover#api-reference
---

<ComponentPreview name="popover-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add popover
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
  import * as Popover from '$lib/components/ui/popover/index.js'
</script>

<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>Place content for the popover here.</Popover.Content>
</Popover.Root>
```
