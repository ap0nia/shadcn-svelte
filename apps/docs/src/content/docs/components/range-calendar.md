---
title: Range Calendar
description: A calendar component that allows users to select a range of dates.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/ui/range-calendar
  doc: https://bits-ui.com/docs/components/range-calendar
  api: https://bits-ui.com/docs/components/range-calendar#api-reference
---

<ComponentPreview name="range-calendar-demo">

<div></div>

</ComponentPreview>

## About

The `<RangeCalendar />` component is built on top of the [Bits Range Calendar](https://www.bits-ui.com/docs/components/range-calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

## Installation

<InstallTabs>
{#snippet cli()}

```bash npm2yarn
npx shadcn-svelte@next add range-calendar
```

{/snippet}
{#snippet manual()}
<Steps>

### Install `bits-ui` and `@internationalized/date`:

```bash npm2yarn
npm i -D bits-ui
```

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>
