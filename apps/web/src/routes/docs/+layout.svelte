<script lang="ts">
  import { page } from '$app/state'
  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import config, { type SidebarNavItem } from '$lib/config/docs'
  import { cn } from '$lib/utils/cn'

  let { children } = $props()
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

<div
  class="flex-1 items-start p-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] gap-8"
>
  <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] md:sticky md:block">
    <ScrollArea class="h-full">
      {#if config.sidebar.length}
        <ul class="w-full space-y-4">
          {#each config.sidebar as item, index (index)}
            <li>
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
  </aside>

  {@render children?.()}
</div>
