# FOLDER X Marketing Website

> **v1.0.1** — Unique, creative marketing site for FOLDER X  
> 🌐 **Live:** [https://folderx.danielpro.dev/](https://folderx.danielpro.dev/)

## 🚀 Quick Start

This repository contains the marketing website for **FOLDER X** — a Windows desktop folder organization tool with templates, intelligent sorting, and mass operations.

### Structure

```
/
├── folderx-marketing/           # Main website
│   ├── index.html              # Homepage
│   ├── css/style.css           # Custom styling
│   ├── js/main.js              # Interactions
│   ├── assets/                 # Logos, cover image
│   ├── shots/                  # Screenshots (WebP)
│   ├── download/               # Executables (not in git)
│   ├── README.md               # Deployment guide
│   ├── DESIGN-NOTES.md         # Creative decisions
│   └── DEPLOYMENT-CHECKLIST.md # Pre-launch checklist
└── README.md                    # This file
```

## 🎨 Features

- ✅ Unique visual language (NOT a Monolog clone)
- ✅ Space Grotesk + Outfit typography pairing
- ✅ Teal brand colors with gradient accents
- ✅ Animated floating folders in hero
- ✅ Scroll reveals, card tilt effects, ripple buttons
- ✅ Custom SVG feature icons
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ SEO optimized with Open Graph tags
- ✅ Static HTML/CSS/JS (no build step)

## 📥 Downloads

The site prominently features two download options:

1. **Installer** — `FOLDER X-Setup-1.0.1.exe`
2. **Portable** — `FOLDER X-1.0.1-portable.exe`

*(Executables not included in repository — add to `folderx-marketing/download/` before deployment)*

## 🌐 Deployment

See [`folderx-marketing/README.md`](folderx-marketing/README.md) for detailed deployment instructions.

**Quick deploy to Contabo:**

```bash
# Clone or copy to server
git clone <repo-url> /var/www/folderx

# Add executables to download/ folder
# Add screenshots to shots/ folder
# Convert images to WebP

# Configure Nginx (see README)
sudo nano /etc/nginx/sites-available/folderx.danielpro.dev

# Enable and reload
sudo ln -s /etc/nginx/sites-available/folderx.danielpro.dev /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Setup SSL
sudo certbot --nginx -d folderx.danielpro.dev
```

## 📚 Documentation

- **[README.md](folderx-marketing/README.md)** — Full deployment guide
- **[DESIGN-NOTES.md](folderx-marketing/DESIGN-NOTES.md)** — Creative direction & decisions
- **[DEPLOYMENT-CHECKLIST.md](folderx-marketing/DEPLOYMENT-CHECKLIST.md)** — Pre-launch checklist

## 🎯 Product Info

**FOLDER X v1.0.1** — Windows Desktop (Electron)

**Features:**
- Templates (Academic, Design, Laravel, React, Office)
- Organize by type, date, or custom rules
- Split & flatten folders
- Mass rename (prefix, suffix, numbering)
- Find duplicates & empty folders
- Disk space analyzer
- Undo history

**Requirements:**
- Windows 10/11 (64-bit)
- ~45 MB download

## 🏗️ Tech Stack

- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript
- **Fonts:** Google Fonts (Space Grotesk, Outfit)
- **Icons:** Custom SVG artwork
- **Images:** WebP for optimization
- **Server:** Nginx on Contabo VPS
- **SSL:** Let's Encrypt / Certbot

## 📝 License

© 2026 FOLDER X — Desenvolvido por [DanielPro](https://danielpro.dev)

---

**Questions?** Contact: support@danielpro.dev
