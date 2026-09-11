# FOLDER X Deployment Checklist

Complete these steps before deploying to production:

## 🖼️ Assets Preparation

### Screenshots
- [ ] Add PNG screenshots to `shots/` folder:
  - [ ] `01-templates-dark.png` (from user's screenshots)
  - [ ] `02-folder-tree.png` (from user's screenshots)
  - [ ] `03-outras-funcs.png` (from user's screenshots)
  - [ ] `04-templates-light.png` (optional)
  
- [ ] Convert to WebP:
  ```bash
  cd shots/
  cwebp -q 85 01-templates-dark.png -o 01-templates-dark.webp
  cwebp -q 85 02-folder-tree.png -o 02-folder-tree.webp
  cwebp -q 85 03-outras-funcs.png -o 03-outras-funcs.webp
  ```

- [ ] Verify image optimization (target 200-400 KB per image)

### Portfolio Cover
- [ ] Convert SVG to WebP:
  ```bash
  cd assets/
  # Option 1: ImageMagick
  convert folderx-cover.svg -resize 1200x750 folderx-cover.webp
  
  # Option 2: rsvg-convert + cwebp
  rsvg-convert -w 1200 -h 750 folderx-cover.svg -o temp.png
  cwebp -q 90 temp.png -o folderx-cover.webp
  rm temp.png
  ```

- [ ] Update `index.html` meta tags to use `.webp` instead of `.svg`:
  ```html
  <meta property="og:image" content="https://folderx.danielpro.dev/assets/folderx-cover.webp">
  <meta name="twitter:image" content="https://folderx.danielpro.dev/assets/folderx-cover.webp">
  ```

## 📥 Download Files

- [ ] Place executables in `download/` folder:
  - [ ] `FOLDER X-Setup-1.0.1.exe` (installer)
  - [ ] `FOLDER X-1.0.1-portable.exe` (portable version)

- [ ] Test download links work correctly
- [ ] Verify file sizes are reasonable (~45 MB mentioned)

## 🌐 Server Setup

### DNS
- [ ] Point `folderx.danielpro.dev` A record to Contabo IP
- [ ] Wait for DNS propagation (check with `dig folderx.danielpro.dev`)

### Contabo Deployment
- [ ] SSH into server
- [ ] Create `/var/www/folderx` directory
- [ ] Set proper permissions (`chown -R www-data:www-data /var/www/folderx`)
- [ ] Copy/clone files to server
- [ ] Configure Nginx (see README.md for config)
- [ ] Enable site: `ln -s /etc/nginx/sites-available/folderx.danielpro.dev /etc/nginx/sites-enabled/`
- [ ] Test Nginx config: `sudo nginx -t`
- [ ] Reload Nginx: `sudo systemctl reload nginx`

### SSL Certificate
- [ ] Install certbot if needed: `sudo apt-get install certbot python3-certbot-nginx`
- [ ] Run certbot: `sudo certbot --nginx -d folderx.danielpro.dev`
- [ ] Verify HTTPS works
- [ ] Test auto-renewal: `sudo certbot renew --dry-run`

## ✅ Testing

### Functionality
- [ ] Homepage loads without errors
- [ ] All navigation links work (#funcionalidades, #templates, #download)
- [ ] Smooth scroll animations work
- [ ] Both download buttons work (installer + portable)
- [ ] All images load correctly (no 404s)
- [ ] Favicon appears in browser tab
- [ ] Footer links work

### Responsive Design
- [ ] Test on mobile (320px, 375px, 414px widths)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Navigation adapts on small screens
- [ ] Hero section responsive
- [ ] Features grid stacks properly
- [ ] Templates section readable on mobile

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images lazy load properly
- [ ] No JavaScript errors in console
- [ ] Animations smooth (60fps)
- [ ] Lighthouse score > 90

### SEO & Social
- [ ] Test Open Graph tags: https://www.opengraph.xyz/
- [ ] Test Twitter card: https://cards-dev.twitter.com/validator
- [ ] Verify robots.txt allows crawling
- [ ] Check meta description present
- [ ] Canonical URL correct

## 🎨 Optional Enhancements

- [ ] Add Google Analytics (if needed)
- [ ] Add cookie consent banner (if tracking users)
- [ ] Create sitemap.xml
- [ ] Add structured data (Schema.org JSON-LD)
- [ ] Set up monitoring (UptimeRobot, StatusCake)
- [ ] Configure email for support@danielpro.dev

## 📋 Post-Launch

- [ ] Share on social media
- [ ] Submit to Google Search Console
- [ ] Add to danielpro.dev portfolio page
- [ ] Monitor analytics
- [ ] Collect user feedback
- [ ] Plan v1.1 updates based on feedback

---

**Current Status:** 🟡 Assets need to be added (screenshots, WebP conversion)

**Deployment Ready:** ❌ Not yet (needs screenshots and executables)

**Estimated Time to Deploy:** ~30 minutes (after assets are ready)
