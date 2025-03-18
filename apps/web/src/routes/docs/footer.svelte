<script lang="ts">
  import packageJson from '../../../../../package.json'
</script>

<footer class="flex flex-col items-center justify-between gap-4 px-4 pb-4 md:flex-row">
  <div class="flex flex-col items-center gap-4 md:flex-row">
    <p class="text-center text-sm leading-loose md:text-left">
      Built by
      <a
        href={packageJson.author.url}
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">{packageJson.author.name}</a
      >. Hosted on

      <a
        href="https://vercel.com"
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">Vercel</a
      >. Illustrations by

      <a
        href="https://popsy.co"
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">Popsy</a
      >. The source code is available on

      <a
        href={packageJson.repository.url}
        target="_blank"
        rel="noreferrer"
        class="link link-hover font-medium">GitHub</a
      >.
    </p>
  </div>

  <button class="btn btn-sm btn-square ring-base-content ring-1" aria-label="Color scheme toggle">
    <span class="swap swap-rotate">
      <span class="icon-[mdi--moon-waxing-crescent] swap-on size-5"></span>
      <span class="icon-[mdi--weather-sunny] swap-off size-5"></span>
    </span>
  </button>

  <!-- <ModeToggle /> -->
</footer>
