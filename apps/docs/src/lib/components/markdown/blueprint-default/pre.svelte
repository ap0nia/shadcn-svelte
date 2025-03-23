<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  import CopyButton from '$lib/components/copy-button.svelte'
  import { cn } from '$lib/utils/cn'

  let { children, ...restProps }: HTMLAttributes<HTMLElement> = $props()

  let ref = $state<HTMLElement>()

  const dataProps = $derived(
    Object.fromEntries(Object.entries(restProps).filter((entry) => entry[0].startsWith('data-'))),
  )

  const dedupedQuotesTitle = $derived(restProps.title?.replace(/^"(.*)"$/, '$1'))
</script>

<!-- The code inside may be subject to special white-space rules when rendering code blocks. -->
<!-- prettier-ignore-start -->
<div
  class={cn(
    restProps.lang && `language-${restProps.lang}`,
    'not-prose',
    'vp-adaptive-theme vp-code',
    'group relative my-4 w-full overflow-x-auto',
    'bg-base-200 text-base-content rounded-box',
  )}
  {...dataProps}
>
  {#if dedupedQuotesTitle}
    <!-- @see https://github.com/yuyinws/vitepress-plugin-group-icons/blob/62c2cf203c6b4f001433089816b341403efefeba/src/codegen.ts#L8-L53 -->
    <!-- A .vp-code-block-title followed by data-title={name with icon} will have an icon applied. -->
    <div class="bg-base-300 vp-code-block-title border-b px-4 py-2">
      <span data-title={dedupedQuotesTitle}>{dedupedQuotesTitle}</span>
    </div>
  {/if}<div class="relative">
    <div class="pointer-events-none absolute top-0 left-0 flex w-full justify-end px-2">
      {#if restProps.lang}
        <span class={cn('text-xs transition-opacity group-hover:opacity-0')}>
          {restProps.lang}
        </span>
      {/if}
    </div><div class="pointer-events-none absolute top-0 left-0 flex w-full justify-end p-2">
      <CopyButton
        {ref}
        class="pointer-events-auto opacity-0 transition-opacity group-hover:opacity-100"
      />
    </div><div class="overflow-x-auto py-4">
      <pre {...restProps} bind:this={ref}>{@render children?.()}</pre>
    </div>
  </div>
</div>
<!-- prettier-ignore-end -->
