import type { FullSlug } from "@quartz-community/utils/path"

export function isNavLinkActive(linkId: string, slug: FullSlug | undefined): boolean {
  if (!slug) return false
  switch (linkId) {
    case "home":
      return slug === "index"
    case "friends":
      return slug === "friends"
    case "about":
      return slug === "about"
    case "tags":
      return slug === "tags" || slug.startsWith("tags/")
    default:
      return false
  }
}
