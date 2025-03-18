---
title: Select

description: Displays a list of options for the user to pick from—triggered by a button.

component: true

links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/select
  doc: https://next.bits-ui.com/docs/components/select
  api: https://next.bits-ui.com/docs/components/select#api-reference
---

<script>
    // import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs'
</script>

## Usage

```svelte
<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js'
</script>

<Select.Root type="single">
  <Select.Trigger class="w-[180px]"></Select.Trigger>
  <Select.Content>
    <Select.Item value="light">Light</Select.Item>
    <Select.Item value="dark">Dark</Select.Item>
    <Select.Item value="system">System</Select.Item>
  </Select.Content>
</Select.Root>
```

```svelte
<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js'
</script>

<Select.Root type="single">
  <Select.Trigger class="w-[180px]"></Select.Trigger>
  <Select.Content>
    <Select.Item value="light">Light</Select.Item>
    <Select.Item value="dark">Dark</Select.Item>
    <Select.Item value="system">System</Select.Item>
  </Select.Content>
</Select.Root>
```

```svelte
<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js'
</script>

<Select.Root type="single">
  <Select.Trigger class="w-[180px]"></Select.Trigger>
  <Select.Content>
    <Select.Item value="light">Light</Select.Item>
    <Select.Item value="dark">Dark</Select.Item>
    <Select.Item value="system">System</Select.Item>
  </Select.Content>
</Select.Root>
```
