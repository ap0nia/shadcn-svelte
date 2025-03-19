declare global {
  declare module 'mdast' {
    export interface Tabs {
      type: 'Tabs'
      children: TabContent[]
      sync?: boolean
      groupId?: string
    }

    export interface TabContent extends Literal, Parent {
      type: 'TabContent'
    }

    export interface RootContentMap {
      tabs: Tabs
      tabContent: TabContent
    }
  }
}
