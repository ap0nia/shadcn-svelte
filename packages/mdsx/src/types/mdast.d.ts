declare global {
  declare module 'mdast' {
    export interface Tabs {
      type: 'Tabs'
      children: (TabsList | TabsContent)[]
      sync?: boolean
      groupId?: string
      value?: string
    }

    export type GitHubAlertVariant = 'TIP' | 'NOTE' | 'IMPORTANT' | 'WARNING' | 'CAUTION'

    export interface GitHubAlert extends Parent {
      type: 'GitHubAlert'
      title: string
      variant: GitHubAlertVariant
    }

    export interface TabsList extends Parent {
      type: 'TabsList'
    }

    export interface TabsTrigger extends Literal, Parent {
      type: 'TabsTrigger'
    }

    export interface TabsContent extends Literal, Parent {
      type: 'TabsContent'
    }

    export interface RootContentMap {
      tabs: Tabs
      tabsList: TabsList
      tabsTrigger: TabsTrigger
      tabsContent: TabsContent
      gitHubAlert: GitHubAlert
    }
  }
}
