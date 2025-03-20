<script lang="ts">
  import { cn } from '$lib/utils/cn'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLElement> & {
    value?: string
  }

  let { children, class: className, value, ...restProps }: Props = $props()

  let copied = $state(false)

  let timeout = $state<ReturnType<typeof setTimeout>>()

  async function copyCode() {
    if (typeof navigator === 'undefined') return

    if (value == null) return

    await navigator.clipboard.writeText(value)

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

<button
  onclick={copyCode}
  class={cn(
    copied && 'swap-active',
    className,
    'btn btn-outline btn-square swap',
    'opacity-0 transition-opacity group-hover:opacity-100',
  )}
  aria-label="Copy"
  {...restProps}
>
  <span class="icon-[mdi--content-copy] swap-off"></span>
  <span class="icon-[mdi--success-bold] swap-on"></span>
</button>
