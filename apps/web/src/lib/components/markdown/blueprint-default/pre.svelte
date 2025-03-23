<script lang="ts">
  import { cn } from '$lib/utils/cn'
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, ...restProps }: HTMLAttributes<HTMLElement> = $props()

  let ref = $state<HTMLElement>()

  let copied = $state(false)

  let timeout = $state<ReturnType<typeof setTimeout>>()

  async function copyCode() {
    if (typeof navigator === 'undefined') return

    if (ref == null) return

    const code = ref.textContent

    if (code == null) return

    await navigator.clipboard.writeText(code)

    copied = true

    debouncedResetCopyCode()
  }

  function debouncedResetCopyCode() {
    clearTimeout(timeout)
    timeout = setTimeout(resetCopyCode, 1_000)
  }

  function resetCopyCode() {
    copied = false
  }

  const dataProps = $derived(
    Object.fromEntries(Object.entries(restProps).filter((entry) => entry[0].startsWith('data-'))),
  )
</script>

<!-- The code inside may be subject to special white-space rules when rendering code blocks. -->
<div
  class={cn(
    restProps.lang && `language-${restProps.lang}`,
    'vp-adaptive-theme vp-code',
    'group relative my-2 w-full overflow-x-auto',
    'bg-base-200 text-base-content rounded-box',
  )}
  {...dataProps}
>
  {#if restProps.title}
    {@const dedupedQuotesTitle = restProps.title.replace(/^"(.*)"$/, '$1')}
    <div class="bg-base-300 px-4 py-2">
      <span>{dedupedQuotesTitle}</span>
    </div>
  {/if}

  <div class="relative">
    <div class="pointer-events-none absolute top-0 left-0 flex w-full justify-end px-2">
      {#if restProps.lang}
        <span class={cn('text-xs transition-opacity group-hover:opacity-0')}>
          {restProps.lang}
        </span>
      {/if}
    </div>

    <div class="pointer-events-none absolute top-0 left-0 flex w-full justify-end p-2">
      <button
        onclick={copyCode}
        class={cn(
          copied && 'swap-active',
          'btn btn-square swap',
          'pointer-events-auto opacity-0 transition-opacity group-hover:opacity-100',
        )}
        aria-label="Copy Code"
      >
        <span class="icon-[mdi--content-copy] swap-off"></span>
        <span class="icon-[mdi--success-bold] swap-on"></span>
      </button>
    </div>

    <div class="overflow-x-auto py-4 bg-base-300">
      <pre {...restProps} bind:this={ref}>{@render children?.()}</pre>
    </div>
  </div>
</div>
<!-- prettier-ignore-end -->
