<script lang="ts">
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggle from '$lib/components/theme-toggle.svelte'
  import * as Avatar from '$lib/components/ui/avatar'
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <span class="icon-[mdi--hamburger-menu] size-6"></span>
      </div>
    </div>

    <a href="/" class="btn btn-ghost h-auto min-h-0">
      <Avatar.Root class="size-16">
        <Avatar.Image src="https://media.tenor.com/CnvquZ_FojAAAAAi/elysia-honkai.gif" alt="Logo" />

        <Avatar.Fallback>
          <span class="icon-[mdi--chevron-down] size-full"></span>
        </Avatar.Fallback>
      </Avatar.Root>
    </a>
  </div>

  <div class="navbar-center hidden lg:flex">CENTER</div>

  <div class="navbar-end space-x-2">
    <LanguageSelect />
    <ThemeSelect />
    <ThemeToggle />
  </div>
</div>
