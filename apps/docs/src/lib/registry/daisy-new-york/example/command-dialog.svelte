<script lang="ts">
  import * as Command from '$lib/registry/daisy-new-york/ui/command/index.js'

  let open = $state(false)

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      open = !open
    }
  }
</script>

<svelte:document onkeydown={handleKeydown} />

<p class="text-base-content/70 text-sm">
  <span>Press</span>
  <kbd class="kbd kbd-sm">⌘ J</kbd>
</p>

<Command.Dialog bind:open portalProps={{ disabled: true }}>
  <Command.Input placeholder="Type a command or search..." />

  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>
        <span class="icon-[mdi--calendar] mr-2 size-4"></span>
        <span>Calendar</span>
      </Command.Item>
      <Command.Item>
        <span class="icon-[mdi--emoji] mr-2 size-4"></span>
        <span>Search Emoji</span>
      </Command.Item>
      <Command.Item>
        <span class="icon-[mdi--calculator] mr-2 size-4"></span>
        <span>Calculator</span>
      </Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>
        <span class="icon-[mdi--user] mr-2 size-4"></span>
        <span>Profile</span>
        <Command.Shortcut>⌘P</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <span class="icon-[mdi--credit-card] mr-2 size-4"></span>
        <span>Billing</span>
        <Command.Shortcut>⌘B</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <span class="icon-[mdi--settings] mr-2 size-4"></span>
        <span>Settings</span>
        <Command.Shortcut>⌘S</Command.Shortcut>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
