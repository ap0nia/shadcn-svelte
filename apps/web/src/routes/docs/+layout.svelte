<script lang="ts">
  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import config from '$lib/config/docs'

  import Sidebar from './sidebar.svelte'

  let { children } = $props()
</script>

<div class="flex h-0 grow flex-col">
  <div class="flex h-full">
    <ScrollArea class="h-full min-w-3xs hidden md:flex">
      <Sidebar items={config.sidebar} />
    </ScrollArea>

    <div class="contents">
      {@render children?.()}
    </div>
  </div>
</div>
