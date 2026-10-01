import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import { Darkmode as createDarkmode } from "@quartz-community/darkmode"
import { ReaderMode as createReaderMode } from "@quartz-community/reader-mode"
import { Search as createSearch } from "@quartz-community/search"
import { classNames } from "@quartz-community/utils/lang"
import { resolveRelative, type FullSlug } from "@quartz-community/utils/path"
import type { JSX } from "preact"
import type { NavLinkConfig, TopCardOptions } from "../types"
import { isNavLinkActive } from "../util/active"

type ToolComponent = (props: QuartzComponentProps) => JSX.Element

const Search = createSearch() as ToolComponent
const Darkmode = createDarkmode() as ToolComponent
const ReaderMode = createReaderMode() as ToolComponent

const defaultOptions: TopCardOptions = {
  links: [
    { id: "home", label: "主页", href: "index" },
    { id: "friends", label: "友链", href: "friends" },
    { id: "about", label: "关于", href: "about" },
    { id: "tags", label: "标签", href: "tags" },
  ],
}

function renderLink(link: NavLinkConfig, slug: FullSlug | undefined, fileSlug: FullSlug) {
  const active = isNavLinkActive(link.id, slug)
  const href = resolveRelative(fileSlug, (link.href ?? "index") as FullSlug)
  return (
    <a
      href={href}
      class={classNames("top-card__link", active && "top-card__link--active")}
      aria-current={active ? "page" : undefined}
    >
      {link.label}
    </a>
  )
}

export default ((userOpts?: Partial<TopCardOptions>) => {
  const opts: TopCardOptions = { ...defaultOptions, ...userOpts }
  const navLinks = opts.links.filter((link) => link.action !== "search")

  const TopCard: QuartzComponent = ({ displayClass, ...props }: QuartzComponentProps) => {
    const slug = props.fileData.slug as FullSlug | undefined
    const fileSlug = (slug ?? "index") as FullSlug

    return (
      <nav class={classNames(displayClass, "top-card")} aria-label="Site">
        <div class="top-card__inner">
          <div class="top-card__links">
            {navLinks.map((link) => (
              <span key={link.id} class="top-card__item">
                {renderLink(link, slug, fileSlug)}
              </span>
            ))}
          </div>
          <div class="top-card__tools">
            <ReaderMode {...props} />
            <Darkmode {...props} />
            <Search {...props} />
          </div>
        </div>
      </nav>
    )
  }

  TopCard.css = `
header:has(.top-card) {
  margin: 0;
  gap: 0;
}
.top-card {
  width: 100%;
  border-bottom: 1px solid var(--lightgray);
  background: color-mix(in srgb, var(--light) 92%, var(--tertiary) 8%);
}
.top-card__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.75rem;
  max-width: var(--page-width, 750px);
  margin: 0 auto;
  padding: 0.65rem 1rem;
}
.top-card__links {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem 1.25rem;
}
.top-card__tools {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-left: auto;
}
.top-card__link {
  position: relative;
  font-family: var(--bodyFont);
  font-size: 0.95rem;
  color: var(--darkgray);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.35rem 0.15rem;
  transition: color 0.15s ease;
}
.top-card__link:hover {
  color: var(--secondary);
}
.top-card__link--active {
  color: var(--dark);
  font-weight: 600;
}
.top-card__link--active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--tertiary);
  border-radius: 1px;
}
.top-card__tools .search {
  min-width: 0;
  max-width: none;
  flex-grow: 0;
}
.top-card__tools .search > .search-button {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  justify-content: center;
}
.top-card__tools .search > .search-button > p {
  display: none;
}
.top-card__tools .search > .search-button svg {
  margin: 0;
  width: 18px;
  min-width: 18px;
}
`

  return TopCard
}) satisfies QuartzComponentConstructor<Partial<TopCardOptions>>
