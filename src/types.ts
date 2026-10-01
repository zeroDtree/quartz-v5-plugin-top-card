export type NavLinkAction = "search"

export interface NavLinkConfig {
  id: string
  label: string
  href?: string
  action?: NavLinkAction
}

export interface TopCardOptions {
  links: NavLinkConfig[]
}
