# Screenshots

This folder should contain optimized WebP images converted from the PNG screenshots:

- `01-templates-dark.webp` - Dark mode templates interface
- `02-folder-tree.webp` - Folder structure tree view
- `03-outras-funcs.webp` - Other features grid
- `04-templates-light.webp` (optional) - Light mode variant

## Converting PNG to WebP

If you have the original PNG files, convert them with:

```bash
cwebp -q 85 01-templates-dark.png -o 01-templates-dark.webp
cwebp -q 85 02-folder-tree.png -o 02-folder-tree.webp
cwebp -q 85 03-outras-funcs.png -o 03-outras-funcs.webp
```

Install `webp` package:
- Ubuntu/Debian: `sudo apt-get install webp`
- macOS: `brew install webp`
- Windows: Download from https://developers.google.com/speed/webp/download

## Placeholder

Until screenshots are added, the gallery section will show broken images.
To hide the gallery section temporarily, add `display: none;` to `.gallery` in CSS.
