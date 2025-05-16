<script lang="ts">
  import * as DropdownMenu from '$lib/registry/daisy-new-york/ui/dropdown-menu/index.js'
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="btn">Open</DropdownMenu.Trigger>

  <DropdownMenu.Content class="w-56" portalProps={{ disabled: true }}>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>

      <DropdownMenu.Separator />

      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <span class="icon-[mdi--user] mr-2 size-4"></span>
          <span>Profile</span>
          <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <span class="icon-[mdi--credit-card] mr-2 size-4"></span>
          <span>Billing</span>
          <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <span class="icon-[mdi--settings] mr-2 size-4"></span>
          <span>Settings</span>
          <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <span class="icon-[mdi--keyboard] mr-2 size-4"></span>
          <span>Keyboard shortcuts</span>
          <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      <DropdownMenu.Separator />

      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <span class="icon-[mdi--users] mr-2 size-4"></span>
          <span>Team</span>
        </DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <span class="icon-[mdi--user-plus] mr-2 size-4"></span>
            <span>Invite users</span>
          </DropdownMenu.SubTrigger>

          <DropdownMenu.SubContent>
            <DropdownMenu.Item>
              <span class="icon-[mdi--email] mr-2 size-4"></span>
              <span>Email</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item>
              <span class="icon-[mdi--message] mr-2 size-4"></span>
              <span>Message</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item>
              <span class="icon-[mdi--plus-circle] mr-2 size-4"></span>
              <span>More...</span>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Item>
          <span class="icon-[mdi--plus] mr-2 size-4"></span>
          <span>New Team</span>
          <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      <DropdownMenu.Separator />

      <DropdownMenu.Item>
        <span class="icon-[mdi--github] mr-2 size-4"></span>
        <span>GitHub</span>
      </DropdownMenu.Item>

      <DropdownMenu.Item>
        <span class="icon-[mdi--lifebuoy] mr-2 size-4"></span>
        <span>Support</span>
      </DropdownMenu.Item>

      <DropdownMenu.Item>
        <span class="icon-[mdi--cloud] mr-2 size-4"></span>
        <span>API</span>
      </DropdownMenu.Item>

      <DropdownMenu.Separator />

      <DropdownMenu.Item>
        <span class="icon-[mdi--logout] mr-2 size-4"></span>
        <span>Log out</span>
        <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
