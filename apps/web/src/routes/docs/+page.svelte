<script lang="ts">
  import { getMessages } from '$lib/i18n'

  const messages = getMessages()
</script>

<main class="bg-base-content h-[200vh] w-full">
  <h1 class="text-base-100">{$messages.hello()}</h1>
</main>
