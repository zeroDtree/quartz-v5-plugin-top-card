import fs from "fs"
import path from "path"

export function validateManifest(): void {
  const pkgPath = path.resolve("package.json")
  if (!fs.existsSync(pkgPath)) return
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  if (!pkg.quartz?.name) {
    console.warn("⚠ quartz-v5-plugin-top-card: missing quartz.name in package.json")
  }
}
