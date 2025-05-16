<script lang="ts">
  import * as AlertDialog from '$lib/registry/daisy-new-york/ui/alert-dialog/index.js'
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger class="btn btn-outline">Show Dialog</AlertDialog.Trigger>

  <AlertDialog.Content portalProps={{ disabled: true }}>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>

      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
