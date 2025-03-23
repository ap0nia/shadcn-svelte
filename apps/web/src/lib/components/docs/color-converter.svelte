<script lang="ts">
  import { formatHex, formatHsl, formatRgb } from 'culori'

  import CopyButton from '$lib/components/copy-button.svelte'

  let { initial = '#030711' } = $props()

  let hex = $state(formatHex(initial))
  let hsl = $state(formatHsl(initial))
  let rgb = $state(formatRgb(initial))
</script>

<div class="card border shadow-sm">
  <div class="card-body items-center">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">HEX</legend>

      <div class="join">
        <input
          type="text"
          class="input join-item"
          bind:value={
            () => hex,
            (newHex) => {
              hex = newHex
              rgb = formatRgb(newHex) || rgb
              hsl = formatHsl(newHex) || hsl
            }
          }
        />

        <CopyButton class="join-item h-auto" value={hex} />
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">HSL</legend>

      <div class="join">
        <label class="input join-item">
          <input
            type="text"
            bind:value={
              () => hsl,
              (newHsl) => {
                hsl = newHsl
                rgb = formatRgb(newHsl) || rgb
                hex = formatHex(newHsl) || hex
              }
            }
          />
        </label>

        <CopyButton class="join-item h-auto" value={hsl} />
      </div>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">RGB</legend>

      <div class="join">
        <input
          type="text"
          class="input join-item"
          bind:value={
            () => rgb,
            (newRgb) => {
              rgb = newRgb
              hex = formatHex(newRgb) || hex
              hsl = formatHsl(newRgb) || hsl
            }
          }
        />

        <CopyButton class="join-item h-auto" value={rgb} />
      </div>
    </fieldset>
  </div>
</div>
