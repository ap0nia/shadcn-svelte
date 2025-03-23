<script lang="ts">
  import { getMessages } from '$lib/i18n'
  import { ScrollArea } from '$lib/registry/new-york/ui/scroll-area'
  import * as Select from '$lib/registry/new-york/ui/select'
  import { config, themes } from '$lib/stores/config'
  import { cn } from '$lib/utils/cn'

  type Props = {
    class?: string
  }

  let props: Props = $props()

  const messages = getMessages()
</script>

<!--
@component
-->

<Select.Root type="single" bind:value={$config.theme}>
  <div data-tip={$messages.selectTheme()} class={cn('tooltip tooltip-bottom', props.class)}>
    <Select.Trigger class="w-28">
      <span class="theme-select-label" data-placeholder={$messages.selectTheme()}>
        {$config.theme}
      </span>
    </Select.Trigger>
  </div>

  <Select.Content>
    <ScrollArea class="h-64 pr-3">
      <Select.Group class="w-full">
        {#each themes as theme (theme.name)}
          <Select.Item value={theme.name} label={theme.label}>
            <div
              class={cn(
                `theme-${theme.name}`,
                'bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm',
              )}
            >
              <div class="bg-base-content size-1 rounded-full"></div>
              <div class="bg-primary size-1 rounded-full"></div>
              <div class="bg-secondary size-1 rounded-full"></div>
              <div class="bg-accent size-1 rounded-full"></div>
            </div>

            <span class="grow">
              {theme.label}
            </span>
          </Select.Item>
        {/each}
      </Select.Group>
    </ScrollArea>
  </Select.Content>
</Select.Root>
