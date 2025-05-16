---
title: Skeleton
description: Use to show a placeholder while content is loading.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/skeleton
---

<ComponentPreview name="skeleton-demo">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add skeleton
```

{/snippet}
{#snippet manual()}
<Steps>

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte notwoslash
<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
</script>
```

```svelte notwoslash
<Skeleton class="h-[20px] w-[100px] rounded-full" />
```
