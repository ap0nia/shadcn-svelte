---
title: Card
description: Displays a card with header, content, and footer.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/card
---

<ComponentPreview name="card-with-form">

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add card
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
  import * as Card from '$lib/components/ui/card/index.js'
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card Description</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card Content</p>
  </Card.Content>
  <Card.Footer>
    <p>Card Footer</p>
  </Card.Footer>
</Card.Root>
```

## Examples

<ComponentPreview name="card-demo">

</ComponentPreview>
