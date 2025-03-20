<script lang="ts">
  import { page } from '$app/state'
  import config, { type SidebarNavItem } from '$lib/config/docs'
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggle from '$lib/components/theme-toggle.svelte'
  import { getLocale } from '$lib/i18n'
  import { localizeHref } from '$lib/paraglide/runtime'
  import * as NavigationMenu from '$lib/registry/new-york/ui/navigation-menu'
  import { ScrollArea } from '$lib/registry/new-york/ui/scroll-area'
  import * as Sheet from '$lib/registry/new-york/ui/sheet'
  import { cn } from '$lib/utils/cn'

  const locale = getLocale()

  const links = $derived.by(() => {
    return config.main.map((item) => {
      return {
        ...item,
        items: item.items?.map((item) => {
          return {
            ...item,
            href: localizeHref(item.href || '', { locale: $locale }),
          }
        }),
        href: localizeHref(item.href || '', { locale: $locale }),
      }
    })
  })
</script>

{#snippet SidebarItem({ items }: { items: SidebarNavItem[] })}
  <ul class="menu w-full">
    {#each items as item, index (index)}
      <li class={cn(item.disabled && 'menu-disabled')}>
        {#if item.href}
          <a
            href={item.href}
            class={cn(page.url.pathname === item.href && 'menu-focus')}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            <span class="whitespace-nowrap">{item.title}</span>

            {#if item.label}
              <span class="badge badge-primary badge-xs">
                {item.label}
              </span>
            {/if}
          </a>
        {:else}
          <span class="whitespace-nowrap">{item.title}</span>
        {/if}
      </li>
    {/each}
  </ul>
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
          {#each links as link (link.title)}
            <NavigationMenu.Item>
              {#if link.items}
                <NavigationMenu.Trigger>
                  <a href={link.href}>{link.title} </a>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content>
                  <ul class="menu w-sm min-w-full">
                    {#each link.items as item (item.href)}
                      <li>
                        <NavigationMenu.Link class="flex flex-col items-start" href={item.href}>
                          <div class="text-sm leading-none font-medium">{item.title}</div>

                          {#if item.description}
                            <p class="text-base-content/70 line-clamp-2 text-sm leading-snug">
                              {item.description}
                            </p>
                          {/if}
                        </NavigationMenu.Link>
                      </li>
                    {/each}
                  </ul>
                </NavigationMenu.Content>
              {:else}
                <NavigationMenu.Link href={link.href}>
                  <span class="hidden sm:inline">{link.title}</span>
                </NavigationMenu.Link>
              {/if}
            </NavigationMenu.Item>
          {/each}

          <NavigationMenu.Indicator />

          <!--
          <NavigationMenu.Item value="getting-started">
            <NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>

            <NavigationMenu.Content>
              <ul
                class={cn(
                  'menu',
                  'm-0 grid items-center gap-x-2.5 p-3',
                  'sm:w-lg sm:grid-flow-col sm:grid-rows-3 sm:p-6',
                )}
              >
                <li class="row-span-3 mb-2 h-full sm:mb-0">
                  <NavigationMenu.Link href="/" class={cn('flex h-full flex-col p-3')}>
                    <div class="flex h-0 flex-grow items-center justify-center">
                      <img src="/images/elysia.gif" alt="Elysia GIF" class="h-full w-fit" />
                    </div>

                    <div class="w-full font-normal">
                      <div class="mt-4 mb-2 text-left text-lg font-medium">Bits UI</div>
                      <p class="text-sm leading-tight">The headless components for Svelte.</p>
                    </div>
                  </NavigationMenu.Link>
                </li>

                <li>
                  <NavigationMenu.Link class="flex flex-col items-start" href="/docs">
                    <div class="text-sm leading-none font-medium">Introduction</div>
                    <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Headless components for Svelte and SvelteKit
                    </p>
                  </NavigationMenu.Link>
                </li>

                <li>
                  <NavigationMenu.Link
                    class="flex flex-col items-start"
                    href="/docs/getting-started"
                  >
                    <div class="text-sm leading-none font-medium">Getting Started</div>
                    <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      How to install and use Bits UI
                    </p>
                  </NavigationMenu.Link>
                </li>

                <li>
                  <NavigationMenu.Link class="flex flex-col items-start" href="/docs/styling">
                    <div class="text-sm leading-none font-medium">Styling</div>
                    <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      How to style Bits UI components
                    </p>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>

            <NavigationMenu.Content>
              <ul
                class={cn(
                  'menu',
                  'grid gap-3 p-3',
                  'sm:w-sm sm:p-6 md:w-md md:grid-cols-2 lg:w-lg',
                )}
              >
                {#each components as component (component.title)}
                  {@render ListItem({
                    href: component.href,
                    title: component.title,
                    content: component.description,
                  })}
                {/each}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link href="/docs">
              <span class="hidden sm:inline">Documentation</span>
              <span class="inline sm:hidden">Docs</span>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        -->
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
    <div>
      <a href="/" class="btn btn-ghost h-auto min-h-0 p-1">
        <img src="/images/elysia.gif" alt="Logo" width="96" height="96" />
      </a>
    </div>

    <ScrollArea class="h-full">
      {#if config.sidebar.length}
        <ul class="w-full">
          {#each config.sidebar as item, index (index)}
            <li class={cn('pb-4')}>
              <h4 class="px-4 py-1 text-sm font-semibold">
                {item.title}
              </h4>

              {#if item?.items}
                {#if item?.items?.length}
                  {@render SidebarItem({ items: item.items })}
                {/if}
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </ScrollArea>
  </Sheet.Content>
</Sheet.Root>
