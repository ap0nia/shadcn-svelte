---
title: Aspect Ratio
description: Displays content within a desired ratio.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/aspect-ratio
  doc: https://bits-ui.com/docs/components/aspect-ratio
  api: https://bits-ui.com/docs/components/aspect-ratio#api-reference
---

<ComponentPreview name="aspect-ratio-demo">

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add aspect-ratio
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
  import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
</script>

<div class="w-[450px]">
  <AspectRatio ratio={16 / 9} class="bg-muted">
    <img src="..." alt="..." class="rounded-md object-cover" />
  </AspectRatio>
</div>
```
