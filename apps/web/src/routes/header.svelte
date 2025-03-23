<script lang="ts">
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggle from '$lib/components/theme-toggle.svelte'
  import { docsConfig, type NavItem } from '$lib/config/docs'
  import { siteConfig } from '$lib/config/site'
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
    {#if link.items?.length}
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
  <header class="bg-base-100 border-base-300 sticky top-0 z-20 border-b border-dashed">
    <div class="navbar border-base-300 container mx-auto h-14 min-h-0 border-x border-dashed">
      <div class="navbar-start w-auto">
        <Sheet.Trigger class="btn btn-ghost btn-square flex md:hidden">
          <span class="icon-[mdi--hamburger-menu] size-6"></span>
        </Sheet.Trigger>

        <a href="/" class="btn btn-ghost hidden h-auto p-1 md:flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="size-6">
            <rect width="256" height="256" fill="none" />

            <line
              x1="208"
              y1="128"
              x2="128"
              y2="208"
              fill="none"
              stroke="#EB4F27"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />

            <line
              x1="192"
              y1="40"
              x2="40"
              y2="192"
              fill="none"
              stroke="#EB4F27"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
          </svg>

          <span class="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </a>
      </div>

      <div class="navbar-center hidden md:flex">
        <NavigationMenu.Root class="relative z-10 w-fit">
          <NavigationMenu.List class={cn('menu menu-horizontal')}>
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

      <div class="navbar-end grow space-x-2">
        <ThemeToggle />
        <ThemeSelect />
        <LanguageSelect />
      </div>
    </div>
  </header>

  <Sheet.Content side="left" class="space-y-2">
    <a href="/" class="btn btn-ghost h-auto min-h-0 p-1">
      <img src="/images/elysia.gif" alt="Logo" width="96" height="96" />
    </a>
    <SidebarMenu />
  </Sheet.Content>
</Sheet.Root>
