<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  let { children, ...restProps }: HTMLAttributes<HTMLElement> = $props()
</script>

<code {...restProps}>{@render children?.()}</code>

<style>
  :global {
    /** The custom `pre` element does not wrap code blocks in twoslash docs. */
    .twoslash-popup-docs {
      code {
        background: var(--color-base-300);
        border-radius: var(--radius-sm);
        padding: calc(var(--spacing) * 1);
      }
    }
  }
</style>
