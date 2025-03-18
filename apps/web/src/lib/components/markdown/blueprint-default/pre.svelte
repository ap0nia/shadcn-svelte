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
  {#if restProps.lang}
    <span class={cn('absolute top-2 right-4', 'text-sm transition-opacity group-hover:opacity-0')}>
      {restProps.lang}
    </span>
  {/if}

  <button
    onclick={copyCode}
    class={cn(
      copied && 'swap-active',
      'btn btn-outline btn-sm swap',
      'absolute top-2 right-4',
      'opacity-0 transition-opacity group-hover:opacity-100',
    )}
    aria-label="Copy Code"
  >
    <span class="icon-[mdi--content-copy] swap-off"></span>
    <span class="icon-[mdi--success-bold] swap-on"></span>
  </button>

  <pre {...restProps} bind:this={ref}>{@render children?.()}</pre>
</div>
