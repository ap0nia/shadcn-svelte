<script lang="ts">
  import * as ShadDefaultAccordion from '$lib/registry/default/ui/accordion'
  import * as ShadNewYorkAccordion from '$lib/registry/new-york/ui/accordion'
  import * as DaisyDefaultAccordion from '$lib/registry/daisy-default/ui/accordion'
  import * as DaisyNewYorkAccordion from '$lib/registry/daisy-new-york/ui/accordion'
</script>

<main class="mx-auto w-full max-w-4xl p-8">
  <div class="theme-zinc">
    <h1>shadcn UI</h1>

    <div class="flex items-center gap-8">
      <ShadDefaultAccordion.Root type="single" class="w-full sm:max-w-[70%]">
        <ShadDefaultAccordion.Item value="item-1">
          <ShadDefaultAccordion.Trigger>Is it accessible?</ShadDefaultAccordion.Trigger>
          <ShadDefaultAccordion.Content
            >Yes. It adheres to the WAI-ARIA design pattern.</ShadDefaultAccordion.Content
          >
        </ShadDefaultAccordion.Item>
        <ShadDefaultAccordion.Item value="item-2">
          <ShadDefaultAccordion.Trigger>Is it styled?</ShadDefaultAccordion.Trigger>
          <ShadDefaultAccordion.Content>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </ShadDefaultAccordion.Content>
        </ShadDefaultAccordion.Item>
        <ShadDefaultAccordion.Item value="item-3">
          <ShadDefaultAccordion.Trigger>Is it animated?</ShadDefaultAccordion.Trigger>
          <ShadDefaultAccordion.Content>
            Yes. It's animated by default, but you can disable it if you prefer.
          </ShadDefaultAccordion.Content>
        </ShadDefaultAccordion.Item>
      </ShadDefaultAccordion.Root>

      <ShadNewYorkAccordion.Root type="single" class="w-full sm:max-w-[70%]">
        <ShadNewYorkAccordion.Item value="item-1">
          <ShadNewYorkAccordion.Trigger>Is it accessible?</ShadNewYorkAccordion.Trigger>
          <ShadNewYorkAccordion.Content
            >Yes. It adheres to the WAI-ARIA design pattern.</ShadNewYorkAccordion.Content
          >
        </ShadNewYorkAccordion.Item>
        <ShadNewYorkAccordion.Item value="item-2">
          <ShadNewYorkAccordion.Trigger>Is it styled?</ShadNewYorkAccordion.Trigger>
          <ShadNewYorkAccordion.Content>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </ShadNewYorkAccordion.Content>
        </ShadNewYorkAccordion.Item>
        <ShadNewYorkAccordion.Item value="item-3">
          <ShadNewYorkAccordion.Trigger>Is it animated?</ShadNewYorkAccordion.Trigger>
          <ShadNewYorkAccordion.Content>
            Yes. It's animated by default, but you can disable it if you prefer.
          </ShadNewYorkAccordion.Content>
        </ShadNewYorkAccordion.Item>
      </ShadNewYorkAccordion.Root>
    </div>
  </div>

  <div class="divider"></div>

  <div>
    <h1>daisyUI</h1>

    <div class="flex items-center gap-8">
      <DaisyDefaultAccordion.Root type="single" class="w-full sm:max-w-[70%]">
        <DaisyDefaultAccordion.Item value="item-1">
          <DaisyDefaultAccordion.Trigger>Is it accessible?</DaisyDefaultAccordion.Trigger>
          <DaisyDefaultAccordion.Content
            >Yes. It adheres to the WAI-ARIA design pattern.</DaisyDefaultAccordion.Content
          >
        </DaisyDefaultAccordion.Item>
        <DaisyDefaultAccordion.Item value="item-2">
          <DaisyDefaultAccordion.Trigger>Is it styled?</DaisyDefaultAccordion.Trigger>
          <DaisyDefaultAccordion.Content>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </DaisyDefaultAccordion.Content>
        </DaisyDefaultAccordion.Item>
        <DaisyDefaultAccordion.Item value="item-3">
          <DaisyDefaultAccordion.Trigger>Is it animated?</DaisyDefaultAccordion.Trigger>
          <DaisyDefaultAccordion.Content>
            Yes. It's animated by default, but you can disable it if you prefer.
          </DaisyDefaultAccordion.Content>
        </DaisyDefaultAccordion.Item>
      </DaisyDefaultAccordion.Root>

      <DaisyNewYorkAccordion.Root type="single" class="w-full sm:max-w-[70%]">
        <DaisyNewYorkAccordion.Item value="item-1">
          <DaisyNewYorkAccordion.Trigger>Is it accessible?</DaisyNewYorkAccordion.Trigger>
          <DaisyNewYorkAccordion.Content
            >Yes. It adheres to the WAI-ARIA design pattern.</DaisyNewYorkAccordion.Content
          >
        </DaisyNewYorkAccordion.Item>
        <DaisyNewYorkAccordion.Item value="item-2">
          <DaisyNewYorkAccordion.Trigger>Is it styled?</DaisyNewYorkAccordion.Trigger>
          <DaisyNewYorkAccordion.Content>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </DaisyNewYorkAccordion.Content>
        </DaisyNewYorkAccordion.Item>
        <DaisyNewYorkAccordion.Item value="item-3">
          <DaisyNewYorkAccordion.Trigger>Is it animated?</DaisyNewYorkAccordion.Trigger>
          <DaisyNewYorkAccordion.Content>
            Yes. It's animated by default, but you can disable it if you prefer.
          </DaisyNewYorkAccordion.Content>
        </DaisyNewYorkAccordion.Item>
      </DaisyNewYorkAccordion.Root>
    </div>
  </div>
</main>
