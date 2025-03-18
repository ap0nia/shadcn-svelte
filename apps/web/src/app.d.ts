/**
 * Adds properties to store from-markdown and to-markdown extensions on {@link Data},
 * which is stored in a {@link Processor}
 */
import 'remark'

/**
 * @see https://svelte.dev/docs/kit/types#app.d.ts
 */
declare global {
  declare module '*.md'

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
