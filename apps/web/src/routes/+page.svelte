<script lang="ts">
  import { getMessages } from '$lib/i18n'
  import SvelteCounter from '$lib/markdown/svelte-counter.md'
  import ReactCounter from '$lib/markdown/react-counter.md'
    import { toast } from 'svelte-sonner'

  const messages = getMessages()
</script>

<main class="space-y-4 p-4">
  <h1>{$messages.hello()}</h1>

  <div class="flex justify-center gap-2">
    <button
      class="btn btn-success data-[disabled]:flex"
      onclick={() => {
        toast.success('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.info('Undo'),
          },
          cancel: {
            label: 'Cancel',
          },
          duration: Infinity,
        })
      }}
    >
      Success
    </button>

    <button
      class="btn btn-info"
      onclick={() => {
        toast.info('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.info('Undo'),
          },
          duration: Infinity,
        })
      }}
    >
      Info
    </button>

    <button
      class="btn btn-warning"
      onclick={() => {
        toast.warning('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.info('Undo'),
          },
          duration: Infinity,
        })
      }}
    >
      Warning
    </button>

    <button
      class="btn btn-error"
      onclick={() => {
        toast.error('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.info('Undo'),
          },
          duration: Infinity,
        })
      }}
    >
      Error
    </button>
  </div>

  <div class="mx-auto max-w-2xl space-y-2">
    <SvelteCounter />
    <ReactCounter />
  </div>
</main>
