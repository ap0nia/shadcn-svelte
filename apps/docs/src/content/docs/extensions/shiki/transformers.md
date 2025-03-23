# @shikijs/transformers

Common transformers for Shiki, inspired by [shiki-processor](https://github.com/innocenzi/shiki-processor).

## Unstyled

Transformers only applies classes and does not come with styles; you can provide your own CSS rules to style them properly.

## Matching Algorithm

We found that the algorithm for matching comments in v1 is sometime conterintuitive, where we are trying to fix it in a progressive way. Since v1.29.0, we introduced a new `matchAlgorithm` option to most of the transformer for you to toggle between different matching algorithms. Right now, the default is `v1` which is the old algorithm, and `v3` is the new algorithm. When Shiki v3 is landed, the default will be `v3`.

### `matchAlgorithm: 'v1'`

The matching algorithm mostly affects the single-line comment matching, in `v1`, it will count the comment line as the first line, while in `v3`, it will count start from the comment line:

```ts
// [\!code highlight:3]
console.log('highlighted') // [!code hl]
console.log('highlighted') // [!code hl]
console.log('not highlighted')
```

### `matchAlgorithm: 'v3'`

In `v3`, the matching algorithm will start counting from the line below the comment:

```ts
// [\!code highlight:2]
console.log('highlighted') // [!code hl]
console.log('highlighted') // [!code hl]
console.log('not highlighted')
```

## Transformers

### `transformerNotationDiff`

Use `[!code ++]` and `[!code --]` to mark added and removed lines.

````md
```ts
console.log('hewwo') // [\!code --]
console.log('hello') // [\!code ++]
console.log('goodbye')
```
````

Renders (with custom CSS rules):

```ts
console.log('hewwo') // [!code --]
console.log('hello') // [!code ++]
console.log('goodbye')
```

- `// [!code ++]` outputs: `<span class="line diff add">`
- `// [!code --]` outputs: `<span class="line diff remove">`
- The outer `<pre>` tag is modified: `<pre class="has-diff">`

:::details{title="HTML Output"}

```html
<!-- Output (stripped of `style` attributes for clarity) -->
<pre class="shiki has-diff"> <!-- Notice `has-diff` -->
  <code>
    <span class="line"></span>
    <span class="line"><span>function</span><span>()</span><span></span><span>{</span></span>
    <span class="line diff remove">  <!-- Notice `diff` and `remove` -->
      <span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hewwo</span><span>&#39;</span><span>) </span>
    </span>
    <span class="line diff add">  <!-- Notice `diff` and `add` -->
      <span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hello</span><span>&#39;</span><span>) </span>
    </span>
    <span class="line"><span></span><span>}</span></span>
    <span class="line"><span></span></span>
  </code>
</pre>
```

:::

---

### `transformerNotationHighlight`

Use `[!code highlight]` to highlight a line.

````md
```ts
console.log('Not highlighted')
console.log('Highlighted') // [\!code highlight]
console.log('Not highlighted')
```
````

Renders (with custom CSS rules):

```ts
console.log('Not highlighted')
console.log('Highlighted') // [!code highlight]
console.log('Not highlighted')
```

- `// [!code highlight]` outputs: `<span class="line highlighted">`
- The outer `<pre>` tag is modified: `<pre class="has-highlighted">`

You can also highlight multiple lines with a single comment:

````md
```ts
// [\!code highlight:3]
console.log('Highlighted')
console.log('Highlighted')
console.log('Not highlighted')
```

```ts
console.log('Not highlighted')
// [\!code highlight:1]
console.log('Highlighted')
console.log('Not highlighted')
```
````

Renders:

```ts
// [!code highlight:3]
console.log('Highlighted')
console.log('Highlighted')
console.log('Not highlighted')
```

```ts
console.log('Not highlighted')
// [!code highlight:1]
console.log('Highlighted')
console.log('Not highlighted')
```

---

### `transformerNotationWordHighlight`

Use `[!code word:Hello]` to highlight the word `Hello` in any subsequent code.

````md
```ts
// [\!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```
````

Renders (with custom CSS rules):

```ts
// [!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```

Outputs: `<span class="highlighted-word">Hello</span>` for matched words.

You can also specify the number of lines to highlight words on, e.g. `[!code word:Hello:1]` will only highlight occurrences of `Hello` on the next line.

````md
```ts
// [\!code word:Hello:1]
const message = 'Hello World'
console.log(message) // prints Hello World
```
````

Renders:

```ts
// [!code word:Hello:1]
const message = 'Hello World'
console.log(message) // prints Hello World
```

---

### `transformerNotationFocus`

Use `[!code focus]` to focus a line.

````md
```ts
console.log('Not focused')
console.log('Focused') // [\!code focus]
console.log('Not focused')
```
````

Renders (with custom CSS rules):

```ts
console.log('Not focused')
console.log('Focused') // [!code focus]
console.log('Not focused')
```

- Outputs: `<span class="line focused">`
- The outer `<pre>` tag is modified: `<pre class="has-focused">`

You can also focus multiple lines with a single comment:

````md
```ts
// [\!code focus:3]
console.log('Focused')
console.log('Focused')
console.log('Not focused')
```
````

Renders:

```ts
// [!code focus:3]
console.log('Focused')
console.log('Focused')
console.log('Not focused')
```

---

### `transformerNotationErrorLevel`

Use `[!code error]` and `[!code warning]` to mark a line with an error and warning levels.

````md
```ts
console.log('No errors or warnings')
console.error('Error') // [\!code error]
console.warn('Warning') // [\!code warning]
```
````

- Outputs: `<span class="line highlighted error">` for errors
- Outputs: `<span class="line highlighted warning">` for warnings
- The outer `<pre>` tag is modified: `<pre class="has-highlighted">`

With some additional CSS rules, you can make it look like this:

```ts
console.log('No errors or warnings')
console.error('Error') // [!code error]
console.warn('Warning') // [!code warning]
```

---

### `transformerMetaHighlight`

Highlight lines based on the [meta string](/guide/transformers#meta) provided on the code snippet.

````md
```js {1,3-4}
console.log('1')
console.log('2')
console.log('3')
console.log('4')
```
````

Renders (with custom CSS rules):

```js {1,3-4}
console.log('1')
console.log('2')
console.log('3')
console.log('4')
```

- Outputs: `<span class="line highlighted">` for included lines.

### `transformerMetaWordHighlight`

Highlight words based on the meta string provided on the code snippet.

````md
```js /Hello/
const msg = 'Hello World'
console.log(msg)
console.log(msg) // prints Hello World
```
````

Renders (with custom CSS rules):

```js /Hello/
const msg = 'Hello World'
console.log(msg) // prints Hello World
```
