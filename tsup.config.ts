import path from "path"
import { defineConfig } from "tsup"
import { validateManifest } from "./src/build/validate-manifest"

validateManifest()

const SINGLETON_EXTERNALS = [
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/compat",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "@quartz-community/search",
  "@quartz-community/darkmode",
  "@quartz-community/reader-mode",
  "vfile",
  "vfile/*",
  "unified",
]

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
  },
  format: ["esm"],
  dts: true,
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  splitting: false,
  outDir: "dist",
  platform: "node",
  // Bundle local deps, but keep Preact and the toolbar components external so
  // they share the Preact instance Quartz renders with.
  noExternal: ["@quartz-community/utils", "@quartz-community/types"],
  external: SINGLETON_EXTERNALS,
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
  esbuildOptions(options) {
    options.jsx = "automatic"
    options.jsxImportSource = "preact"
  },
  esbuildPlugins: [
    {
      name: "inline-script-loader",
      setup(build) {
        build.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
          const esbuild = await import("esbuild")
          const fs = await import("fs")
          let text = await fs.promises.readFile(args.path, "utf8")
          text = text.replace(/^export default /gm, "")
          text = text.replace(/^export /gm, "")
          const result = await esbuild.build({
            stdin: {
              contents: text,
              loader: "ts",
              resolveDir: path.dirname(args.path),
            },
            write: false,
            bundle: true,
            minify: true,
            platform: "browser",
            format: "esm",
            target: "es2020",
          })
          const js = result.outputFiles?.[0]?.text ?? ""
          return { contents: js, loader: "text" }
        })
      },
    },
  ],
})
