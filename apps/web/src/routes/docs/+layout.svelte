<script lang="ts">
  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import config from '$lib/config/docs'

  import Sidebar from './sidebar.svelte'
  import Footer from './footer.svelte'

  let { children } = $props()
</script>

<div class="flex flex-col min-h-dvh">
  <div class="flex ">
    <aside class="hidden h-dvh flex-col md:sticky md:flex top-0">
      <ScrollArea class="h-0 min-w-3xs grow">
        <Sidebar items={config.sidebar} />
      </ScrollArea>
    </aside>

    <div class="contents">
      {@render children?.()}
    </div>
  </div>

  <div class="divider"></div>

  <Footer />
</div>
