import { describe, expect, it } from "vitest"
import { isNavLinkActive } from "../src/util/active"

describe("isNavLinkActive", () => {
  it("highlights home", () => {
    expect(isNavLinkActive("home", "index")).toBe(true)
    expect(isNavLinkActive("home", "friends")).toBe(false)
  })

  it("highlights tags prefix", () => {
    expect(isNavLinkActive("tags", "tags")).toBe(true)
    expect(isNavLinkActive("tags", "tags/plugin")).toBe(true)
  })
})
