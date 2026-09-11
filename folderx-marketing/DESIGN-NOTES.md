# FOLDER X Design Notes

## 🎨 Visual Language — What Makes It Unique

This site was intentionally designed to **NOT** be a Monolog clone or follow typical SaaS marketing patterns. Here's what makes it distinctive:

### Typography
- **Display:** Space Grotesk — geometric, bold, technical feel
- **Body:** Outfit — clean, modern, highly readable
- **Pairing rationale:** Space Grotesk's technical boldness contrasts with Outfit's friendly approachability

### Color Palette
```
Teal Accent Gradient:
- Primary: #14b8a6 (teal-500)
- Dark:    #0d9488 (teal-900)
- Light:   #2dd4bf (teal-300)
- Bright:  #5eead4 (teal-100)

Neutrals:
- Charcoal: #1a1a1a
- Gray scale: #2a2a2a → #e5e5e5
- White: #ffffff
```

**Why teal?** Represents organization, clarity, trust, and professionalism without being corporate. The gradient from deep teal to bright cyan creates energy and modernity.

### Layout Philosophy

#### 1. Asymmetric Hero
- **Left:** Content-heavy with strong hierarchy
- **Right:** Floating folder animations
- **Not centered like Monolog** — creates dynamic tension

#### 2. Feature Grid
- 8 cards in auto-fit grid (not fixed 3-column)
- Custom SVG icons (not Bootstrap/Heroicons)
- Hover tilt effect with 3D perspective
- Top border accent animates on hover

#### 3. Template Showcase
- **Left:** Sticky dark preview card with live folder tree
- **Right:** Stacked template cards that slide right on hover
- Two-column asymmetric layout (not centered single column)

#### 4. Download Section
- Dark gradient background (inverted from hero)
- Two large button variants side-by-side
- Prominent file names shown as `<small>` tags
- Glowing teal accents on dark charcoal

### Animation Strategy

All animations serve a **purpose** and feel **organic**:

1. **Floating Folders (Hero)**
   - 6-second infinite float with rotation
   - Staggered delays (0s, 0.8s, 1.6s, 2.4s)
   - Subtle drop shadows
   - Represents folders "lifting up" from chaos

2. **Scroll Reveals**
   - IntersectionObserver-based (performance-friendly)
   - Opacity + translateY for cards
   - TranslateX for template cards (directional interest)
   - Threshold: 0.1 with -50px bottom margin

3. **Card Tilt Effect**
   - Mousemove → calculate relative position
   - Apply 3D perspective rotation (-3° to +3°)
   - Smooth transform on hover out
   - Feels tactile and responsive

4. **Ripple Buttons**
   - Click creates expanding circle
   - 600ms animation duration
   - White ripple with fade-out
   - Premium interaction feel

5. **Navigation Hide/Show**
   - Auto-hide on scroll down (after 100px)
   - Auto-show on scroll up
   - Smooth transform with backdrop blur

### Custom Iconography

All feature icons are **custom SVG** designs, not generic icon sets:

- **Templates:** Folder with circle badge
- **Rules:** Checkmark in circle
- **Divide/Flatten:** Grid squares
- **Rename:** Lines with "01" counter
- **Duplicates:** Overlapping rectangles
- **History:** Clock with arrow
- **Space Analysis:** Document with bar chart
- **Share:** Network nodes

**Design principle:** Simple, bold, 2.5px strokes, teal accent color

### Micro-interactions

1. **Logo hover:** Lifts up 2px
2. **Nav link hover:** Underline slides in from left
3. **Button hover:** Lifts 3px + shadow expansion
4. **Feature card hover:** Top border scales from 0 to 100%
5. **Template card hover:** Slides right 8px
6. **Gallery image hover:** Scales 102%
7. **Tree item hover:** Background glow

### Typography Hierarchy

```
Hero Title:       clamp(2.5rem, 6vw, 4.5rem) — Space Grotesk 700
Section Title:    clamp(2rem, 5vw, 3.5rem) — Space Grotesk 700
Feature Title:    1.5rem — Space Grotesk 700
Body Text:        1.0625rem (17px) — Outfit 400
Small Text:       0.9375rem (15px) — Outfit 400
Tiny Labels:      0.875rem (14px) — Outfit 600
```

All responsive with `clamp()` — no breakpoint jumps.

### Spacing System

Uses CSS custom properties:
```css
--space-xs:   0.5rem (8px)
--space-sm:   1rem (16px)
--space-md:   2rem (32px)
--space-lg:   4rem (64px)
--space-xl:   6rem (96px)
--space-2xl:  8rem (128px)
```

**Vertical rhythm:** Sections use `--space-2xl` (8rem) padding for generous whitespace.

### What We Avoided (Anti-Monolog)

❌ **Centered hero with single CTA**  
✅ Asymmetric hero with dual CTAs

❌ **3-column feature grid**  
✅ Auto-fit grid with 8 unique icons

❌ **Generic icon library**  
✅ Custom SVG artwork

❌ **Static screenshots**  
✅ Animated floating folders + sticky preview

❌ **Typical SaaS pastel gradients**  
✅ Bold teal-to-cyan gradient with dark charcoal

❌ **Minimal animations**  
✅ Rich micro-interactions, scroll reveals, parallax

❌ **Subtle shadows**  
✅ Prominent shadows with glow effects

❌ **"Get started" boring CTAs**  
✅ "Descarregar instalador" / "Versão portátil" (specific, actionable)

### Accessibility Considerations

- Semantic HTML5 elements (`<nav>`, `<section>`, `<footer>`)
- Color contrast ratios meet WCAG AA
- Focus states on all interactive elements
- Keyboard navigation supported
- Reduced motion respected (could add `prefers-reduced-motion`)
- Alt text on images (gallery captions)
- ARIA labels where needed

### Performance Optimizations

1. **Lazy loading** for gallery images
2. **IntersectionObserver** for scroll reveals (not scroll events)
3. **CSS animations** over JavaScript when possible
4. **Transform/opacity** animations (GPU-accelerated)
5. **WebP images** (50% smaller than PNG)
6. **No external dependencies** (pure vanilla JS)
7. **Minimal HTTP requests** (inline critical CSS could be added)

### Easter Egg

**Konami Code:** ↑↑↓↓←→←→BA  
Activates rainbow hue-rotate animation for 5 seconds. Hidden delight for power users.

---

## 📐 Design Decisions

### Why floating folders in hero?
Represents the product's core function (folder management) while creating visual interest and motion. The parallax effect on scroll makes them feel "interactive" even though they're decorative.

### Why dark template preview?
Mirrors the actual app's dark mode UI. Creates strong contrast against the light background sections. Sticky positioning keeps it visible during scroll, emphasizing importance.

### Why two download buttons?
Users need to choose: installer or portable. Making both equally prominent reduces friction. Showing exact file names builds trust.

### Why Space Grotesk?
Technical, modern, geometric — matches the app's systematic nature. Bold weights make statements. Pairs well with Outfit's friendliness.

### Why teal over blue?
Blue is overused in tech. Teal feels fresh, organized, trustworthy but not corporate. The gradient adds energy.

---

## 🎯 Target Audience Assumptions

- **Windows power users** (technical knowledge)
- **Developers & designers** (appreciate clean UI, keyboard shortcuts)
- **Productivity enthusiasts** (want control, efficiency)
- **Portuguese speakers** (interface is in PT)

Tone: Professional but approachable. Confident, not salesy.

---

## 🚀 Future Enhancements

- [ ] Video demo in hero (MP4 with autoplay muted)
- [ ] Customer testimonials section
- [ ] Comparison table (vs manual organization)
- [ ] Blog/changelog link in footer
- [ ] Dark mode toggle (site theme, not just app)
- [ ] Animated SVG illustrations for features
- [ ] Before/after folder structure animations
- [ ] Template creator tool (interactive)

---

**Design Philosophy:** *Clarity over cleverness. Motion with purpose. Bold but not overwhelming.*
