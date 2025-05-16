---
title: Sonner
description: An opinionated toast component for Svelte.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/sonner
  doc: https://svelte-sonner.vercel.app/
  api: https://github.com/wobsoriano/svelte-sonner
---

<ComponentPreview name="sonner-demo">

<div></div>

</ComponentPreview>

## About

The Sonner component is provided by [svelte-sonner](https://svelte-sonner.vercel.app/), which is a Svelte port of [Sonner](https://sonner.emilkowal.ski/), originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

## Installation

<Steps>

<Step>
	Setup theme support
</Step>

By default, Sonner will use the user's system preferences to determine whether to show the light or dark theme. To get around this, you can either pass in a custom `theme` prop to the component, or simply use [mode-watcher](https://github.com/svecosystem/mode-watcher) which you can hardcode to `dark` or `light` mode should you wish.

You can learn more about setting up Dark Mode support [here](/docs/dark-mode).

If you wish to opt out of Dark Mode support, you can uninstall `mode-watcher` and remove the `theme` prop from the component after installing via CLI, or manually install the component and don't include `mode-watcher`

<Step>
	Run the following command:
</Step>

```bash npm2yarn
npx shadcn-svelte@next add sonner
```

<Step>
	Add the Toaster component
</Step>

Note: Make sure you are adding the import from the path `"$lib/components/ui/sonner"` not `"svelte-sonner"`.

```svelte notwoslash title="+layout.svelte" {2,6}
<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner/index.js'
  let { children } = $props()
</script>

<Toaster />

{@render children?.()}
```

</Steps>

<div class="collapse bg-base-100 border-base-300 border">
  <input type="checkbox" />

  <div class="collapse-title font-semibold">Manual Installation</div>

  <div class="collapse-content text-sm">

1. Install `svelte-sonner`:

```bash npm2yarn
npm i -D svelte-sonner
```

2. Copy and paste the component source files linked at the top of this page into your project.

  </div>
</div>

## Usage

```svelte notwoslash
<script lang="ts">
  import { toast } from 'svelte-sonner'
  import { Button } from '$lib/components/ui/button/index.js'
</script>

<Button onclick={() => toast('Hello world')}>Show toast</Button>
```
