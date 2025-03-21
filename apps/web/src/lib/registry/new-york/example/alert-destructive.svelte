<script lang="ts">
  import * as Alert from '$lib/registry/new-york/ui/alert'
</script>

<Alert.Root class="alert alert-error">
  <svg class="icon-[mdi--error-outline] size-4"></svg>
  <Alert.Title class="text-base">Error</Alert.Title>
  <Alert.Description>Your session has expired. Please login again.</Alert.Description>
</Alert.Root>
