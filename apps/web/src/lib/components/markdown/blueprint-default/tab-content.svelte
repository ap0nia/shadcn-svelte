<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs'

  let props = $props()

  $inspect('TAB CONTENT PROPS', props)
</script>

<Tabs.Content value={props.value}>
  {@render props.children?.()}
</Tabs.Content>
