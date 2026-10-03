# Paceline – responsive running-shop website

A two-page responsive site (Home + About) built from the supplied design, using plain HTML, CSS and JavaScript. No build step or dependencies.

## Run locally
Any static server works (Windows, macOS or Linux):

```bash
# Option 1 – Python
python -m http.server 8000
# Option 2 – Node
npx serve .
```


## Structure
```
index.html  about.html  men.html  women.html  footwear.html  apparel.html  brands.html  sale.html
css/styles.css      design tokens, layout, responsive rules
js/main.js          nav menu, hero slider, arrivals filter, wishlist, newsletter validation
assets/img/         images converted to WebP (≈590 KB total, down from ≈9 MB)
```

## Features
- Responsive from phones to wide desktops (breakpoints at 700px and 1000px)
- Interactive: mobile menu, auto-rotating hero with slide controls, filterable new arrivals, wishlist hearts, newsletter validation
- Accessible: skip link, semantic landmarks, keyboard focus styles, ARIA states, alt text, reduced-motion support
- Performance: WebP images with width/height set, lazy loading below the fold, priority hero image, deferred JS

