# Screenshot Placeholders

The following WebP images are expected but not yet added:

1. `01-templates-dark.webp` - Templates interface in dark mode
2. `02-folder-tree.webp` - Folder tree structure view  
3. `03-outras-funcs.webp` - Other features grid
4. `04-templates-light.webp` - Templates interface in light mode (optional)

## To Add Screenshots

1. Place PNG screenshots in this folder
2. Convert to WebP:
   ```bash
   cwebp -q 85 01-templates-dark.png -o 01-templates-dark.webp
   cwebp -q 85 02-folder-tree.png -o 02-folder-tree.webp
   cwebp -q 85 03-outras-funcs.png -o 03-outras-funcs.webp
   ```
3. Optimize for web (target ~200-400 KB per image)
4. Commit to repository

## Temporary Solution

The website currently references these images. Until they're added:
- Gallery section will show broken image placeholders
- Or comment out the gallery section in `index.html`
- Or add CSS: `.gallery { display: none; }`
