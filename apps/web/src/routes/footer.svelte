<script lang="ts">
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggle from '$lib/components/theme-toggle.svelte'
  import { getMessages } from '$lib/i18n'

  const messages = getMessages()

  import packageJson from '../../../../package.json'
</script>

<footer class="flex flex-col items-center justify-between gap-4 px-4 pb-4 md:flex-row">
  <div class="flex flex-col items-center gap-4 md:flex-row">
    <span class="icon-[mdi--apple-keyboard-command] shrink-0 size-6"></span>

    <p class="text-center text-sm leading-loose md:text-left">
      {$messages.builtBy()}
      <a
        href={packageJson.author.url}
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">{packageJson.author.name}</a
      >. {$messages.hostedOn()}

      <a
        href="https://vercel.com"
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">Vercel</a
      >. {$messages.illustrationsBy()}

      <a
        href="https://popsy.co"
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">Popsy</a
      >. {$messages.theSourceCodeIsAvailable()}

      <a
        href={packageJson.repository.url}
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">GitHub</a
      >.
    </p>
  </div>

  <div class="flex items-center gap-2">
    <ThemeToggle class="tooltip-top" />
    <ThemeSelect class="tooltip-top" />
    <LanguageSelect class="tooltip-top" />
  </div>
</footer>
