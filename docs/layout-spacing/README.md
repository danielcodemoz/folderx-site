# Template layout and section spacing

Before/after captures of the templates and screenshots sections, using the same local Chromium setup and PT/light settings:

| Viewport | Before | After |
| --- | --- | --- |
| Desktop (1440px) | [Before](before-desktop.jpg) | [After](after-desktop.jpg) |
| Mobile (390px) | [Before](before-mobile.jpg) | [After](after-mobile.jpg) |

Baseline: `5a18adb` (site files identical to initial checkout `869dc08`).

## Validation

- Chromium: 320, 390, 768, 1024, 1280 and 1440px, both PT/EN settings and light/dark themes (24 configurations per revision).
- All six template cards remain present; each opens its modal and closes with Escape in every after configuration.
- No page JavaScript errors or document horizontal overflow detected.
- At 1280/1440px, the preview and card grid have matching heights. Tablet stacks the preview above a two-column grid; up to 600px, cards use one column.
- Gap from the template grid to the screenshots: 256px before; 48px at mobile/tablet, approximately 61px at 1024px, 77px at 1280px and 80px at 1440px after.
- `git diff --check` and JavaScript syntax check passed. Static site has no build step or test suite.
- Captures use existing system font fallbacks with the external Google Fonts request blocked for consistency. Production web-font rendering was not verified. Existing PT/EN text and JavaScript are unchanged.

To review locally, run `python3 -m http.server 8000 --directory folderx-marketing`, open `http://localhost:8000`, and inspect templates/gallery at desktop and mobile widths. Toggle PT/EN and theme, and click each template.

No deployment performed.
