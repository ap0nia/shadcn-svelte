<script lang="ts">
  import { docsConfig, type NavItem } from '$lib/config/docs'
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggle from '$lib/components/theme-toggle.svelte'
  import { getLocale } from '$lib/i18n'
  import { localizeHref } from '$lib/paraglide/runtime'
  import * as NavigationMenu from '$lib/registry/new-york/ui/navigation-menu'
  import * as Sheet from '$lib/registry/new-york/ui/sheet'
  import { cn } from '$lib/utils/cn'

  import SidebarMenu from './sidebar-menu.svelte'

  const locale = getLocale()
</script>

{#snippet NavigationMenuSubList({ items }: NavItem)}
  <ul class="menu max-h-96 min-w-3xs flex-nowrap overflow-y-auto">
    {#each items ?? [] as item (item.href)}
      <li>
        <NavigationMenu.Link
          class={cn('flex flex-col items-start', item.items?.length && 'pointer-events-none')}
          href={item.href}
        >
          <div class:font-medium={item.description}>
            {item.title}
          </div>

          {#if item.description}
            <p class="text-base-content/70 line-clamp-2 text-sm leading-snug">
              {item.description}
            </p>
          {/if}
        </NavigationMenu.Link>

        {#if item.items?.length}
          {@render NavigationMenuSubList(item as any)}
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

{#snippet NavigationMenuItem(link: NavItem)}
  <NavigationMenu.Item>
    {#if link.items}
      {@const href = localizeHref(link.href || '/', { locale: $locale })}

      <NavigationMenu.Trigger>
        <a {href}>{link.title} </a>
      </NavigationMenu.Trigger>

      <NavigationMenu.Content>
        {@render NavigationMenuSubList(link)}
      </NavigationMenu.Content>
    {:else}
      <NavigationMenu.Link href={link.href}>
        <span class="hidden sm:inline">{link.title}</span>
      </NavigationMenu.Link>
    {/if}
  </NavigationMenu.Item>
{/snippet}

<Sheet.Root>
  <div class="navbar bg-base-100 sticky top-0 z-20 shadow-sm">
    <div class="navbar-start">
      <Sheet.Trigger class="btn btn-ghost btn-square flex md:hidden">
        <span class="icon-[mdi--hamburger-menu] size-6"></span>
      </Sheet.Trigger>

      <a href="/" class="btn btn-ghost hidden h-auto min-h-0 md:flex">
        <img src="/images/elysia.gif" alt="Logo" width="64" height="64" />
      </a>
    </div>

    <div class="navbar-center hidden md:flex">
      <NavigationMenu.Root class="relative z-10 w-fit">
        <NavigationMenu.List class={cn('menu menu-horizontal menu-sm')}>
          {#each docsConfig.main as link (link.title)}
            {@render NavigationMenuItem(link)}
          {/each}
          <NavigationMenu.Indicator />
        </NavigationMenu.List>

        <div class="absolute top-full left-0 flex min-w-full justify-center perspective-[2000px]">
          <NavigationMenu.Viewport />
        </div>
      </NavigationMenu.Root>
    </div>

    <div class="navbar-end space-x-2">
      <ThemeToggle />
      <ThemeSelect />
      <LanguageSelect />
    </div>
  </div>

  <Sheet.Content side="left" class="space-y-2">
    <a href="/" class="btn btn-ghost h-auto min-h-0 p-1">
      <img src="/images/elysia.gif" alt="Logo" width="96" height="96" />
    </a>
    <SidebarMenu />
  </Sheet.Content>
</Sheet.Root>
