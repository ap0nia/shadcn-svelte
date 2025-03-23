<script lang="ts">
  import * as ShadAccordion from '$lib/registry/new-york/ui/accordion'
  import * as DaisyAccordion from '$lib/registry/daisy-new-york/ui/accordion'
</script>

<main class="mx-auto w-full max-w-2xl p-8">
  <div class="theme-zinc">
    <h1>shadcn UI</h1>

    <ShadAccordion.Root type="single" class="w-full sm:max-w-[70%]">
      <ShadAccordion.Item value="item-1">
        <ShadAccordion.Trigger>Is it accessible?</ShadAccordion.Trigger>
        <ShadAccordion.Content
          >Yes. It adheres to the WAI-ARIA design pattern.</ShadAccordion.Content
        >
      </ShadAccordion.Item>
      <ShadAccordion.Item value="item-2">
        <ShadAccordion.Trigger>Is it styled?</ShadAccordion.Trigger>
        <ShadAccordion.Content>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </ShadAccordion.Content>
      </ShadAccordion.Item>
      <ShadAccordion.Item value="item-3">
        <ShadAccordion.Trigger>Is it animated?</ShadAccordion.Trigger>
        <ShadAccordion.Content>
          Yes. It's animated by default, but you can disable it if you prefer.
        </ShadAccordion.Content>
      </ShadAccordion.Item>
    </ShadAccordion.Root>
  </div>

  <div class="divider"></div>

  <div>
    <h1>daisyUI</h1>
    <DaisyAccordion.Root type="single" class="w-full sm:max-w-[70%]">
      <DaisyAccordion.Item value="item-1">
        <DaisyAccordion.Trigger>Is it accessible?</DaisyAccordion.Trigger>
        <DaisyAccordion.Content
          >Yes. It adheres to the WAI-ARIA design pattern.</DaisyAccordion.Content
        >
      </DaisyAccordion.Item>
      <DaisyAccordion.Item value="item-2">
        <DaisyAccordion.Trigger>Is it styled?</DaisyAccordion.Trigger>
        <DaisyAccordion.Content>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </DaisyAccordion.Content>
      </DaisyAccordion.Item>
      <DaisyAccordion.Item value="item-3">
        <DaisyAccordion.Trigger>Is it animated?</DaisyAccordion.Trigger>
        <DaisyAccordion.Content>
          Yes. It's animated by default, but you can disable it if you prefer.
        </DaisyAccordion.Content>
      </DaisyAccordion.Item>
    </DaisyAccordion.Root>
  </div>
</main>
