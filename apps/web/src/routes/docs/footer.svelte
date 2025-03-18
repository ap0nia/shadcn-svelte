<script lang="ts">
  import LanguageSelect from '$lib/components/language-select.svelte'
  import messages from '$lib/i18n'
  import packageJson from '../../../../../package.json'
</script>

<footer class="flex flex-col items-center justify-between gap-4 px-4 pb-4 md:flex-row">
  <div class="flex flex-col items-center gap-4 md:flex-row">
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
    <LanguageSelect />

    <button class="btn btn-sm btn-square ring-base-content ring-1" aria-label="Color scheme toggle">
      <span class="swap swap-rotate">
        <span class="icon-[mdi--moon-waxing-crescent] swap-on size-5"></span>
        <span class="icon-[mdi--weather-sunny] swap-off size-5"></span>
      </span>
    </button>
  </div>

  <!-- <ModeToggle /> -->
</footer>
