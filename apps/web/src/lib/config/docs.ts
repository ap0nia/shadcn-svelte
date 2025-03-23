import type { Component } from 'svelte'

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: Component
  label?: string
  items?: NavItem[]
  description?: string
}

export const main: NavItem[] = [
  {
    title: 'Documentation',
    href: '/docs',
  },
  {
    title: 'Components',
    href: '/docs/components/accordion',
  },
  {
    title: 'Blocks',
    href: '/blocks',
  },
  {
    title: 'Charts',
    href: '/charts',
  },
  {
    title: 'Themes',
    href: '/themes',
  },
  {
    title: 'Colors',
    href: '/colors',
  },
]

export const sidebar: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs',
      },
      {
        title: 'Installation',
        href: '/docs/installation',
      },
      {
        title: 'components.json',
        href: '/docs/components-json',
      },
      {
        title: 'Theming',
        href: '/docs/theming',
      },
      {
        title: 'Dark mode',
        href: '/docs/dark-mode',
      },
      {
        title: 'CLI',
        href: '/docs/cli',
      },
      {
        title: 'Monorepo',
        href: '/docs/monorepo',
      },
      {
        title: 'Tailwind v4',
        href: '/docs/tailwind-v4',
        label: 'New',
      },
      {
        title: 'Next.js 15 + React 19',
        href: '/docs/react-19',
      },
      {
        title: 'Typography',
        href: '/docs/typography',
      },
      {
        title: 'Open in v0',
        href: '/docs/v0',
      },
      {
        title: 'Blocks',
        href: '/docs/blocks',
      },
      {
        title: 'Figma',
        href: '/docs/figma',
      },
      {
        title: 'Changelog',
        href: '/docs/changelog',
      },
      {
        title: 'Migration',
        label: 'v5',
        // if there is a svelte 6 migration etc point to /docs/migration
        href: '/docs/migration/svelte-5',
      },
      {
        title: 'About',
        href: '/docs/about',
      },
    ],
  },
  {
    title: 'Extensions',
    items: [
      {
        title: 'Shiki',
        items: [
          {
            title: 'Transformers',
            href: '/docs/extensions/shiki/transformers',
          },
        ],
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        title: 'Sidebar',
        href: '/docs/components/sidebar',

        label: 'New',
      },
      {
        title: 'Accordion',
        href: '/docs/components/accordion',
      },
      {
        title: 'Alert',
        href: '/docs/components/alert',
      },
      {
        title: 'Alert Dialog',
        href: '/docs/components/alert-dialog',
      },
      {
        title: 'Aspect Ratio',
        href: '/docs/components/aspect-ratio',
      },
      {
        title: 'Avatar',
        href: '/docs/components/avatar',
      },
      {
        title: 'Badge',
        href: '/docs/components/badge',
      },
      {
        title: 'Breadcrumb',
        href: '/docs/components/breadcrumb',
      },
      {
        title: 'Button',
        href: '/docs/components/button',
      },
      {
        title: 'Calendar',
        href: '/docs/components/calendar',
      },
      {
        title: 'Card',
        href: '/docs/components/card',
      },
      {
        title: 'Carousel',
        href: '/docs/components/carousel',
      },
      {
        title: 'Checkbox',
        href: '/docs/components/checkbox',
      },
      {
        title: 'Collapsible',
        href: '/docs/components/collapsible',
      },
      {
        title: 'Combobox',
        href: '/docs/components/combobox',
      },
      {
        title: 'Command',
        href: '/docs/components/command',
      },
      {
        title: 'Context Menu',
        href: '/docs/components/context-menu',
      },
      {
        title: 'Data Table',
        href: '/docs/components/data-table',
      },
      {
        title: 'Date Picker',
        href: '/docs/components/date-picker',
      },
      {
        title: 'Dialog',
        href: '/docs/components/dialog',
      },
      {
        title: 'Drawer',
        href: '/docs/components/drawer',
      },
      {
        title: 'Dropdown Menu',
        href: '/docs/components/dropdown-menu',
      },
      {
        title: 'Form',
        href: '/docs/components/form',
      },
      {
        title: 'Hover Card',
        href: '/docs/components/hover-card',
      },
      {
        title: 'Input',
        href: '/docs/components/input',
      },
      {
        title: 'Input OTP',
        href: '/docs/components/input-otp',

        label: 'New',
      },
      {
        title: 'Label',
        href: '/docs/components/label',
      },
      {
        title: 'Menubar',
        href: '/docs/components/menubar',
      },
      // {
      //   title: "Navigation Menu",
      //   href: "#",
      //   label: "Soon",
      //   disabled: true,
      //   items: []
      // },
      {
        title: 'Pagination',
        href: '/docs/components/pagination',
      },
      {
        title: 'Popover',
        href: '/docs/components/popover',
      },
      {
        title: 'Progress',
        href: '/docs/components/progress',
      },
      {
        title: 'Radio Group',
        href: '/docs/components/radio-group',
      },
      {
        title: 'Range Calendar',
        href: '/docs/components/range-calendar',
      },
      {
        title: 'Resizable',
        href: '/docs/components/resizable',
      },
      {
        title: 'Scroll Area',
        href: '/docs/components/scroll-area',
      },
      {
        title: 'Select',
        href: '/docs/components/select',
      },
      {
        title: 'Separator',
        href: '/docs/components/separator',
      },
      {
        title: 'Sheet',
        href: '/docs/components/sheet',
      },
      {
        title: 'Skeleton',
        href: '/docs/components/skeleton',
      },
      {
        title: 'Slider',
        href: '/docs/components/slider',
      },
      {
        title: 'Sonner',
        href: '/docs/components/sonner',
      },
      {
        title: 'Switch',
        href: '/docs/components/switch',
      },
      {
        title: 'Table',
        href: '/docs/components/table',
      },
      {
        title: 'Tabs',
        href: '/docs/components/tabs',
      },
      {
        title: 'Textarea',
        href: '/docs/components/textarea',
      },
      // {
      //   title: "Toast",
      //   href: "#",
      //   label: "Soon",
      //   disabled: true,
      // },
      {
        title: 'Toggle',
        href: '/docs/components/toggle',
      },
      {
        title: 'Toggle Group',
        href: '/docs/components/toggle-group',
      },
      {
        title: 'Tooltip',
        href: '/docs/components/tooltip',
      },
    ],
  },
]

export const docsConfig = {
  main,
  sidebar,
}

export default docsConfig
