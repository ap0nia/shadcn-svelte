---
title: Alert
description: Displays a callout for user attention.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/alert
---

<ComponentPreview name="alert-demo">

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add alert
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
  import * as Alert from "$lib/components/ui/alert/index.js";
</script>

<Alert.Root>
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>
    You can add components to your app using the cli.
  </Alert.Description>
</Alert.Root>
```

## Examples

### Default

<ComponentPreview name="alert-demo">

</ComponentPreview>

### Destructive

<ComponentPreview name="alert-destructive">

</ComponentPreview>
