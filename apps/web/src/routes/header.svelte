<script lang="ts">
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggle from '$lib/components/theme-toggle.svelte'
</script>

<div class="navbar bg-base-100 z-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
    </div>

    <a href="/" class="btn btn-ghost text-xl">
      <img src="/images/elysia.gif" alt="Logo" class="h-full w-full" />
    </a>
  </div>

  <div class="navbar-center hidden lg:flex">CENTER</div>

  <div class="navbar-end space-x-2">
    <LanguageSelect />
    <ThemeSelect />
    <ThemeToggle />
  </div>
</div>
