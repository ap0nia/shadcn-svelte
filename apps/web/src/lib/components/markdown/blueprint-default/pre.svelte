<script lang="ts">
  import { cn } from '$lib/utils/cn'
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, ...restProps }: HTMLAttributes<HTMLPreElement> & { code?: string } = $props()

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
</script>

<div
  class={cn(
    `restProps.lang && language-${restProps.lang}`,
    'vp-adaptive-theme',
    'group relative overflow-x-auto p-4',
    'bg-base-300 text-base-content rounded-box',
  )}
>
  <div class="absolute top-0 left-0 flex w-full justify-end px-4 py-1">
    {#if restProps.lang}
      <span class={cn('text-sm transition-opacity group-hover:opacity-0')}>
        {restProps.lang}
      </span>
    {/if}
  </div>

  <div class="absolute top-0 left-0 flex w-full justify-end px-2 py-1">
    <button
      onclick={copyCode}
      class={cn(
        copied && 'swap-active',
        'btn btn-outline btn-square swap',
        'opacity-0 transition-opacity group-hover:opacity-100',
      )}
      aria-label="Copy Code"
    >
      <span class="icon-[mdi--content-copy] swap-off"></span>
      <span class="icon-[mdi--success-bold] swap-on"></span>
    </button>
  </div>

  <pre {...restProps} bind:this={ref}>{@render children?.()}</pre>
</div>
