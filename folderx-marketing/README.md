# FOLDER X — Marketing Website

> **Unique, creative marketing website for FOLDER X v1.0.1**  
> Templates. Organização. Controlo.

🌐 **Live:** [https://folderx.danielpro.dev/](https://folderx.danielpro.dev/)

---

## 🎨 Creative Direction

This site features a **distinctive visual language** — NOT a clone of Monolog or typical marketing sites:

- **Typography:** Space Grotesk (display) + Outfit (body)
- **Colors:** Teal accent (#14b8a6), charcoal dark (#1a1a1a)
- **Animations:** Floating folders, scroll reveals, card tilt effects, ripple buttons
- **Layout:** Asymmetric hero, sticky template preview, custom feature grid
- **Icons:** Custom SVG vectors, no generic icon libraries

---

## 🚀 Features

- ✅ Static HTML/CSS/JS (no build step required)
- ✅ SEO optimized with Open Graph tags
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Accessibility basics (semantic HTML, ARIA, keyboard nav)
- ✅ Smooth scroll animations with IntersectionObserver
- ✅ Performance-friendly (lazy loading, CSS animations)
- ✅ Two prominent download CTAs (installer + portable)
- ✅ Easter egg (Konami code: ↑↑↓↓←→←→BA)

---

## 📦 Structure

```
folderx-marketing/
├── index.html              # Main page
├── css/
│   └── style.css          # Unique custom styles
├── js/
│   └── main.js            # Interactions & animations
├── assets/
│   ├── favicon.svg        # Teal folder icon
│   └── folderx-cover.webp # Portfolio cover (1200×750)
├── shots/                  # Screenshot images (webp)
│   ├── 01-templates-dark.webp
│   ├── 02-folder-tree.webp
│   └── 03-outras-funcs.webp
├── download/
│   ├── .gitkeep           # Placeholder (no exe files in git)
│   ├── FOLDER X-Setup-1.0.1.exe        (not in git)
│   └── FOLDER X-1.0.1-portable.exe     (not in git)
└── README.md              # This file
```

---

## 🖼️ Screenshots & Assets

### Converting Screenshots to WebP

The original PNG screenshots need to be converted to optimized WebP:

```bash
# Install webp tools (if not installed)
# Ubuntu/Debian:
sudo apt-get install webp

# macOS:
brew install webp

# Convert screenshots
cd shots/
cwebp -q 85 01-templates-dark.png -o 01-templates-dark.webp
cwebp -q 85 02-folder-tree.png -o 02-folder-tree.webp
cwebp -q 85 03-outras-funcs.png -o 03-outras-funcs.webp

# For portfolio cover (if creating from screenshot)
cwebp -resize 1200 750 -q 90 01-templates-dark.png -o ../assets/folderx-cover.webp
```

**Note:** The PNG files in `/workspace/folderx-marketing/shots/` need to be added to this repo or converted from the user's source images.

---

## 📥 Download Files

Place the actual installer and portable executables in the `download/` directory:

```
download/
├── FOLDER X-Setup-1.0.1.exe        (actual installer)
└── FOLDER X-1.0.1-portable.exe     (portable version)
```

The HTML links use URL encoding for spaces:
- `download/FOLDER%20X-Setup-1.0.1.exe`
- `download/FOLDER%20X-1.0.1-portable.exe`

### Alternative (if spaces cause issues in web server):

Rename files to remove spaces:

```bash
cd download/
mv "FOLDER X-Setup-1.0.1.exe" "FOLDER-X-Setup-1.0.1.exe"
mv "FOLDER X-1.0.1-portable.exe" "FOLDER-X-1.0.1-portable.exe"
```

Then update HTML links accordingly.

---

## 🌐 Deployment to Contabo

### Option 1: Direct Copy to /var/www/folderx

```bash
# SSH into Contabo server
ssh user@your-contabo-server

# Create directory
sudo mkdir -p /var/www/folderx
sudo chown -R $USER:$USER /var/www/folderx

# From local machine, rsync the site
rsync -avz --exclude '.git' \
  folderx-marketing/ \
  user@your-contabo-server:/var/www/folderx/
```

### Option 2: Git Clone on Server

```bash
# On Contabo server
cd /var/www/
sudo git clone https://github.com/yourusername/folderx-marketing.git folderx
cd folderx
sudo chown -R www-data:www-data /var/www/folderx
```

### Nginx Configuration

Create `/etc/nginx/sites-available/folderx.danielpro.dev`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name folderx.danielpro.dev;
    
    root /var/www/folderx;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Download files with proper MIME types
    location /download/ {
        types {
            application/octet-stream exe;
        }
        add_header Content-Disposition 'attachment';
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|webp|gif|ico|svg|css|js|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable site and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/folderx.danielpro.dev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Let's Encrypt

```bash
sudo certbot --nginx -d folderx.danielpro.dev
```

---

## 🔧 DNS Configuration

Point your domain to Contabo server:

```
Type: A
Name: folderx
Value: YOUR_CONTABO_IP
TTL: 3600
```

---

## ✅ Testing Checklist

- [ ] All images load correctly (webp format)
- [ ] Both download links work (installer + portable)
- [ ] Smooth scroll navigation
- [ ] Responsive on mobile, tablet, desktop
- [ ] Animations don't cause performance issues
- [ ] SEO meta tags present (og:image, og:title, etc.)
- [ ] Favicon displays in browser tab
- [ ] Links to #funcionalidades, #templates, #download work
- [ ] Footer links functional

---

## 🎨 Portfolio Cover

The `assets/folderx-cover.webp` file (1200×750) should feature:
- FOLDER X branding
- Teal accent colors
- Screenshot or mockup of the app
- "Templates. Organização. Controlo." tagline

This image is used for:
- Open Graph social sharing
- danielpro.dev portfolio card
- Link previews on social media

---

## 📄 License

© 2026 FOLDER X — Desenvolvido por [DanielPro](https://danielpro.dev)

---

## 🚧 TODO

- [ ] Add actual PNG screenshots to `shots/` folder
- [ ] Convert screenshots to optimized WebP
- [ ] Create portfolio cover image (1200×750)
- [ ] Place installer and portable exe files in `download/`
- [ ] Deploy to Contabo server
- [ ] Configure Nginx and SSL
- [ ] Test all functionality on live site

---

**Questions or issues?**  
Contact: support@danielpro.dev
