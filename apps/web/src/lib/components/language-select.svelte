<script lang="ts">
  import * as Select from '$lib/components/ui/select'
  import { getMessages, getLocale } from '$lib/i18n'
  import { locales, type Locale } from '$lib/paraglide/runtime'
  import { cn } from '$lib/utils/cn'

  const locale = getLocale()

  const messages = getMessages()

  let { class: className = '' } = $props()

  async function handleSelectedChange(selected?: string) {
    if (selected == null) return
    locale.set(selected as Locale, { reload: false })
  }
</script>

<!--
@component

A select menu that navigates to different language settings.
-->

<div data-tip={$messages.selectLanguage()} class="tooltip tooltip-bottom">
  <Select.Root type="single" value={$locale} onValueChange={handleSelectedChange}>
    <Select.Trigger class={cn(className, 'min-w-28')}>
      {$messages.__name() || $messages.selectLanguage()}
    </Select.Trigger>

    <Select.Content class="!w-auto">
      <Select.Group class="menu w-full p-0">
        {#each locales as locale}
          <Select.Item value={locale}>
            {$messages.__code({}, { locale })}
            {$messages.__name({}, { locale })}
          </Select.Item>
        {/each}
      </Select.Group>
    </Select.Content>
  </Select.Root>
</div>
