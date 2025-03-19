import { persisted } from 'svelte-persisted-store'

export const styles = [
  {
    name: 'default',
    label: 'Default',
  },
  {
    name: 'new-york',
    label: 'New York',
  },
] as const

export type Style = (typeof styles)[number]

export function isStyle(s: string): s is Style['name'] {
  return styles.some((style) => style.name === s)
}

type Config = {
  style: Style['name']
  // theme: Theme['name']
  radius: number
}

export const config = persisted<Config>('config', {
  style: 'default',
  // theme: 'zinc',
  radius: 0.5,
})
