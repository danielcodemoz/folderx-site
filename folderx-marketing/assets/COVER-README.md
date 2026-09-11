# Portfolio Cover Image

## Current Status
- `folderx-cover.svg` - Vector source file (1200×750)

## Converting to WebP

To create the final `folderx-cover.webp` for social sharing:

### Option 1: Using rsvg-convert + cwebp
```bash
# Convert SVG to PNG first
rsvg-convert -w 1200 -h 750 folderx-cover.svg -o folderx-cover.png

# Convert PNG to WebP
cwebp -q 90 folderx-cover.png -o folderx-cover.webp

# Clean up PNG
rm folderx-cover.png
```

### Option 2: Using ImageMagick
```bash
convert folderx-cover.svg -resize 1200x750 folderx-cover.webp
```

### Option 3: Online converter
- Upload `folderx-cover.svg` to https://cloudconvert.com/svg-to-webp
- Set dimensions to 1200×750
- Download as `folderx-cover.webp`

## Usage
This image is referenced in:
- `index.html` Open Graph tags (`og:image`)
- `index.html` Twitter card (`twitter:image`)
- DanielPro portfolio card on danielpro.dev

Until converted, the SVG will work for most purposes, but WebP is preferred for:
- Smaller file size (~50% smaller than PNG)
- Better compression
- Wide browser support
