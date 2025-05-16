---
title: Hover Card
description: For sighted users to preview content available behind a link.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/link-preview
  doc: https://bits-ui.com/docs/components/link-preview
  api: https://bits-ui.com/docs/components/link-preview#api-reference
---

<ComponentPreview name="hover-card-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add hover-card
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
  import * as HoverCard from '$lib/components/ui/hover-card/index.js'
</script>

<HoverCard.Root>
  <HoverCard.Trigger>Hover</HoverCard.Trigger>
  <HoverCard.Content>SvelteKit - Web development, streamlined</HoverCard.Content>
</HoverCard.Root>
```
