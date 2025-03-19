<script lang="ts">
  import { getMessages } from '$lib/i18n'

  const messages = getMessages()
</script>

<main class="h-full w-full">
  <div class="h-[200vh] w-full">
    <h1>{$messages.hello()}</h1>
  </div>
</main>
