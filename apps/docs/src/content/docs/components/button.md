---
title: Button
description: Displays a button or a component that looks like a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/button
  doc: https://bits-ui.com/docs/components/button
  api: https://bits-ui.com/docs/components/button#api-reference
---

<ComponentPreview name="button-demo">

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add button
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
  import { Button } from "$lib/components/ui/button/index.js";
</script>
```

```svelte notwoslash
<Button variant="outline">Button</Button>
```

### Link

You can convert the `<button>` into an `<a>` element by simply passing an `href` as a prop.

```svelte notwoslash
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button href="/dashboard">Dashboard</Button>
```

Alternatively, you can use the `buttonVariants` helper to create a link that looks like a button.

```svelte notwoslash
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
</script>

<a href="/dashboard" class={buttonVariants({ variant: "outline" })}>
  Dashboard
</a>
```

## Examples

### Primary

<ComponentPreview name="button-demo">

</ComponentPreview>

---

### Secondary

<ComponentPreview name="button-secondary">

</ComponentPreview>

---

### Destructive

<ComponentPreview name="button-destructive">

</ComponentPreview>

---

### Outline

<ComponentPreview name="button-outline">

</ComponentPreview>

---

### Ghost

<ComponentPreview name="button-ghost">

</ComponentPreview>

---

### Link

<ComponentPreview name="button-link">

</ComponentPreview>

---

### With Icon

<ComponentPreview name="button-with-icon">

</ComponentPreview>

---

### Icon

<ComponentPreview name="button-icon">

</ComponentPreview>

---

### Loading

<ComponentPreview name="button-loading">

</ComponentPreview>
