# quartz-v5-plugin-top-card

Site header for Quartz v5: navigation links, plus reader mode, dark mode, and search.

## Install

Quartz builds the plugin from source on install. Search, dark mode, and reader mode stay as peer packages so they share the site Preact instance.

```yaml
plugins:
  - source: github:zeroDtree/quartz-v5-plugin-top-card
    enabled: true
    layout:
      position: header
      priority: 5
```

## Options

`links` is `{ id, label, href }[]`.

| `id` | Default `label` | Default `href` |
| --- | --- | --- |
| `home` | 主页 | `index` |
| `friends` | 友链 | `friends` |
| `about` | 关于 | `关于` |
| `tags` | 标签 | `tags` |

## Usage

Keep `search`, `darkmode`, and `reader-mode` enabled, but place them on a non-header slot such as `body`. Top Card draws those controls on the right of the header.

## Development

```bash
git clone git@github.com:zeroDtree/quartz-v5-plugin-top-card.git my-plugins/quartz-v5-plugin-top-card
cd my-plugins/quartz-v5-plugin-top-card
npm ci
npm run dev
```

Point the site at `source: ./my-plugins/quartz-v5-plugin-top-card` while editing. After pushing, switch back to the GitHub source.

## Scripts

```bash
npm run check
npm run build
```

## License

MIT
