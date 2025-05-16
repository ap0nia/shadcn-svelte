---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/alert-dialog
  doc: https://bits-ui.com/docs/components/alert-dialog
  api: https://bits-ui.com/docs/components/alert-dialog#api-reference
---

<ComponentPreview name="alert-dialog-demo">

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add alert-dialog
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
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js'
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>Open</AlertDialog.Trigger>

  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```
