<script lang="ts">
  import { createObservableLocale, setLocale, setMessages } from '$lib/i18n'

  const locale = createObservableLocale()

  setLocale(locale)

  setMessages(locale)
</script>
