<script lang="ts">
  import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner'
  import { mode } from 'mode-watcher'
  import { cn } from '$lib/utils/cn'
  import { getMessages } from '$lib/i18n'

  let { richColors, ...props }: SonnerProps = $props()

  const messages = getMessages()
</script>

<Sonner
  dir={$messages.__direction() as any}
  theme={$mode}
  class="toaster group"
  visibleToasts={4}
  toastOptions={{
    classes: {
      toast: cn(
        richColors ? '!alert' : '!text-base-content',
        'group toast group-[.toaster]:shadow-lg',
      ),
      success: '!alert-success text-success-content',
      error: '!alert-error text-error-content',
      warning: '!alert-warning text-warning-content',
      info: '!alert-info text-info-content',
      description: 'group-[.toast]:text-muted-foreground',
      actionButton: 'group-[.toast]:!btn group-[.toast]:!btn-xs',
      cancelButton: 'group-[.toast]:!btn group-[.toast]:!btn-xs',
    },
  }}
  {...props}
>
  <span slot="success-icon" class="icon-[mdi--success-circle] size-5"></span>
  <span slot="error-icon" class="icon-[mdi--error] size-5"></span>
  <span slot="warning-icon" class="icon-[mdi--warning-outline] size-5"></span>
  <span slot="info-icon" class="icon-[mdi--information-box-outline] size-5"></span>
</Sonner>
