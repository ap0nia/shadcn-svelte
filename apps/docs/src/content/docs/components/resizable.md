---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/resizable
  doc: https://www.paneforge.com
---

<ComponentPreview name="resizable-demo">

<div></div>

</ComponentPreview>

## About

The `Resizable` component is built on top of [PaneForge](https://github.com/svecosystem/paneforge) by [Huntabyte](https://github.com/huntabyte). Visit the [PaneForge documentation](https://paneforge.com) for all the available props and abilities of the `Resizable` component.

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add resizable
```

{/snippet}
{#snippet manual()}
<Steps>

### Install `paneforge`:

```bash npm2yarn
npm i -D paneforge@next
```

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte notwoslash
<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js'
</script>

<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

## Examples

### Vertical

Use the `direction` prop to set the direction of the resizable panels.

<ComponentPreview name="resizable-vertical">

<div></div>

</ComponentPreview>

```svelte notwoslash showLineNumbers {5}
<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js'
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Handle

You can set or hide the handle by using the `withHandle` prop on the `ResizableHandle` component.

<ComponentPreview name="resizable-handle">

<div></div>

</ComponentPreview>

```svelte notwoslash showLineNumbers {7}
<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js'
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```
