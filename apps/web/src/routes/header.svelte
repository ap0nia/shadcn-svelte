<script lang="ts">
  import { page } from '$app/state'
  import config, { type SidebarNavItem } from '$lib/config/docs'
  import LanguageSelect from '$lib/components/language-select.svelte'
  import ThemeSelect from '$lib/components/theme-select.svelte'
  import ThemeToggle from '$lib/components/theme-toggle.svelte'
  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import * as Sheet from '$lib/components/ui/sheet'
  import { cn } from '$lib/utils/cn'
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
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <Sheet.Trigger class="btn btn-ghost flex md:hidden">
        <span class="icon-[mdi--hamburger-menu] size-6"></span>
      </Sheet.Trigger>

      <a href="/" class="btn btn-ghost hidden h-auto min-h-0 md:flex">
        <img src="/images/elysia.gif" alt="Logo" width="96" height="96" />
      </a>
    </div>

    <div class="navbar-center hidden lg:flex">CENTER</div>

    <div class="navbar-end space-x-2">
      <LanguageSelect />
      <ThemeSelect />
      <ThemeToggle />
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
