<script lang="ts">
  import { cn } from '$lib/utils/cn'
  import type { HTMLAttributes } from 'svelte/elements'

  type PreExtendedProps = {
    code?: string
    __src__?: string
    __style__?: string
  }

  let {
    children,
    __src__,
    __style__,
    ...restProps
  }: HTMLAttributes<HTMLPreElement> & PreExtendedProps = $props()

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

<!-- The code inside may be subject to special white-space rules when rendering code blocks. -->
<!-- prettier-ignore-start -->
<div
  class={cn(
    restProps.lang && `language-${restProps.lang}`,
    'vp-adaptive-theme',
    'group relative overflow-x-auto p-4',
    'bg-base-300 text-base-content rounded-box',
  )}
  data-src={__src__}
  data-style={__style__}
>
  <div class="absolute top-0 left-0 flex w-full justify-end px-4 py-1">
    {#if restProps.lang}
      <span class={cn('text-sm transition-opacity group-hover:opacity-0')}>
        {restProps.lang}
      </span>
    {/if}
  </div><div class="absolute top-0 left-0 flex w-full justify-end px-2 py-1">
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
  </div><pre {...restProps} bind:this={ref}>{@render children?.()}</pre>
</div>

<!-- prettier-ignore-end -->

<style>
  :global {
    [data-style='new-york'] [data-style='default'] {
      display: none;
    }

    [data-style='default'] [data-style='new-york'] {
      display: none;
    }
  }
</style>
