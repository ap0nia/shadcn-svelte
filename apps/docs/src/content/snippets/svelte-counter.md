```svelte twoslash
<script lang="ts">
  let count = $state(0)

  function increment() {
    count++
  }

  function decrement() {
    count--
  }
</script>

<div>
  <p>
    <span>Current count is:&nbsp;</span>
    <span>{count}</span>
  </p>

  <button onclick={increment}>Increment</button>
  <button onclick={decrement}>Decrement</button>
</div>
```
