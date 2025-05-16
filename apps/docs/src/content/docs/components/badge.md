---
title: Badge
description: Displays a badge or a component that looks like a badge.
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/badge
---

<ComponentPreview name="badge-demo">

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add badge
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
  import { Badge } from '$lib/components/ui/badge/index.js'
</script>
```

```svelte notwoslash
<Badge variant="outline">Badge</Badge>
```

### Link

You can use the `badgeVariants` helper to create a link that looks like a badge.

```svelte notwoslash
<script lang="ts">
  import { badgeVariants } from '$lib/components/ui/badge/index.js'
</script>

<a href="/dashboard" class={badgeVariants({ variant: 'outline' })}>Badge</a>
```

## Examples

### Default

<ComponentPreview name="badge-demo">

</ComponentPreview>

---

### Secondary

<ComponentPreview name="badge-secondary">

</ComponentPreview>

---

### Outline

<ComponentPreview name="badge-outline">

</ComponentPreview>

---

### Destructive

<ComponentPreview name="badge-destructive">

</ComponentPreview>
