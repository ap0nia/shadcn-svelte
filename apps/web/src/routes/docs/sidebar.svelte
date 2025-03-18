<script lang="ts">
  import { page } from '$app/state'
  import type { SidebarNavItem } from '$lib/config/docs'
  import { cn } from '$lib/utils/cn'

  type Props = {
    items: SidebarNavItem[]
  }

  let { items }: Props = $props()
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

{#if items.length}
  <ul class="w-full">
    {#each items as item, index (index)}
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
