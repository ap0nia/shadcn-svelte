<script lang="ts">
  import SidebarMenu from '../sidebar-menu.svelte'

  let { children } = $props()
</script>

<div
  class="container mx-auto flex-1 items-start gap-8 p-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]"
>
  <aside class="fixed top-20 hidden h-[calc(100vh-8rem)] md:sticky md:block">
    <SidebarMenu />
  </aside>

  {@render children?.()}
</div>
