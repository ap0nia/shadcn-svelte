---
title: Drawer
description: A drawer component for Svelte.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/drawer
  doc: https://github.com/huntabyte/vaul-svelte
---

<ComponentPreview name="drawer-demo">

<div></div>

</ComponentPreview>

## About

Drawer is built on top of [Vaul Svelte](https://vaul-svelte.com), which is a Svelte port of [Vaul](https://vaul.emilkowal.ski) by [Emil Kowalski](https://twitter.com/emilkowalski_).

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add drawer
```

{/snippet}
{#snippet manual()}
<Steps>

### Install `vaul-svelte`:

```bash npm2yarn
npm i -D vaul-svelte@next
```

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte notwoslash
<script lang="ts">
  import * as Drawer from '$lib/components/ui/drawer/index.js'
</script>

<Drawer.Root>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
```

## Examples

### Responsive Dialog

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` on desktop and a `Drawer` on mobile.

<ComponentPreview name="drawer-dialog">

<div></div>

</ComponentPreview>
