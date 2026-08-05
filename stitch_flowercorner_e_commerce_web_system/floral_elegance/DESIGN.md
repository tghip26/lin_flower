---
name: Floral Elegance
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5b3f43'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#8f6f73'
  outline-variant: '#e4bdc2'
  surface-tint: '#bc004b'
  primary: '#b80049'
  on-primary: '#ffffff'
  primary-container: '#e2165f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2be'
  secondary: '#6b5a60'
  on-secondary: '#ffffff'
  secondary-container: '#f4dce4'
  on-secondary-container: '#716066'
  tertiary: '#005fa0'
  on-tertiary: '#ffffff'
  tertiary-container: '#0078c8'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2be'
  on-primary-fixed: '#400014'
  on-primary-fixed-variant: '#900038'
  secondary-fixed: '#f4dce4'
  secondary-fixed-dim: '#d7c1c8'
  on-secondary-fixed: '#25181e'
  on-secondary-fixed-variant: '#524249'
  tertiary-fixed: '#d1e4ff'
  tertiary-fixed-dim: '#9ecaff'
  on-tertiary-fixed: '#001d36'
  on-tertiary-fixed-variant: '#00497d'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
  sale-red: '#FF3B3D'
  background-faint: '#F5F5F5'
  border-light: '#EEEEEE'
  success-green: '#4CAF50'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  price-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  price-strikethrough:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 64px
---

## Brand & Style

The design system is built to evoke a sense of **delicate professionalism, joy, and reliability**. It caters to both the emotional consumer looking for the perfect gift and the task-oriented administrator managing logistics. 

The aesthetic is **Modern Minimalist with a Soft-Touch**, blending the efficiency of high-end e-commerce with the organic, gentle nature of the floral industry. We use generous whitespace, subtle shadows, and a refined color palette to ensure the vibrant photography of the flowers remains the centerpiece of the experience. The interface should feel breathable, premium, and trustworthy.

## Colors

This design system utilizes a vibrant **Primary Pink (#E91E63)** as the main driver for calls to action and brand recognition. This is balanced by a **Secondary Pastel Pink (#FCE4EC)** used for backgrounds, chip states, and soft highlights.

- **Primary:** Reserved for high-priority buttons (Buy Now, Submit) and active states.
- **Secondary:** Used for container backgrounds to reduce visual fatigue and provide a soft brand touch.
- **Neutral:** A deep charcoal (#3D3D3D) is used for typography to maintain high legibility without the harshness of pure black.
- **Functional Colors:** `sale-red` is dedicated exclusively to discount badges and urgency indicators. `success-green` is used for checkout confirmations and stock availability.

## Typography

We use **Montserrat** across all levels to maintain a clean, modern, and geometric feel that remains highly readable at small sizes in the Admin dashboard.

- **Hierarchy:** Use `display-lg` for marketing banners. Section headers should use `headline-lg`.
- **Commerce Specifics:** Dedicated price styles ensure that costs are prominent. Use the primary color for current prices and a muted neutral for strikethrough (original) prices.
- **Readability:** Body text uses a slightly increased line height (1.5x) to ensure long product descriptions and SEO text are easy to digest.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop, transitioning to a **2-column grid** for product listings on mobile.

- **Grid:** On desktop, the grid has a max-width of 1200px to maintain focus. Gutters are fixed at 24px to provide ample "breathing room" between product cards.
- **Vertical Rhythm:** Sections (e.g., "New Products" vs "Best Sellers") are separated by a 64px gap to clearly delineate categories.
- **Admin Dashboard:** For the staff interface, the spacing density increases; use a 4px base unit and reduce section gaps to 32px to maximize information density on data tables.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Soft Ambient Shadows**.

- **Surface Levels:** The primary background is `FFFFFF`. Product cards and containers sit on Level 1 with a very soft, diffused shadow (0px 4px 20px, 5% opacity neutral). 
- **Interactive Depth:** On hover, cards should lift slightly (8px shadow) to provide tactile feedback.
- **Overlays:** Modals and "Lead Capture" forms use a semi-transparent backdrop blur (8px) with a Level 3 shadow to isolate the task from the background noise.
- **Flat Elements:** Borders are used sparingly. Use `border-light` (#EEEEEE) for table rows in the Admin dashboard and dividers in the footer.

## Shapes

The design system uses a **Rounded** shape language to mirror the organic curves of flowers and petals.

- **Standard Elements:** Product cards, input fields, and standard buttons use a 0.5rem (8px) radius.
- **Promotional Elements:** Discount tags and small "New" badges use a `rounded-lg` (1rem) or full pill-shape to distinguish them from functional UI components.
- **Dashboard:** Data inputs in the Admin panel may scale down to 4px (Soft) if space is constrained, but the consumer-facing interface must remain consistently rounded.

## Components

### Buttons
- **Primary:** Solid #E91E63 with white text. High-emphasis for "Order Now".
- **Secondary:** Outlined with #E91E63 or solid #FCE4EC with #E91E63 text for secondary actions like "Add to Cart".
- **Ghost:** No background, primary color text for navigation or "See More".

### Cards
- **Product Card:** Clean white background, 8px radius, subtle shadow. Image takes the top 70% of the card. Titles are `headline-md`, followed by the dual-price row.
- **Admin Card:** Flat with a 1px #EEEEEE border, used for grouping statistics and data summaries.

### Inputs & Form Fields
- **Search Bar:** Pill-shaped with a soft shadow to encourage discovery.
- **Form Inputs:** 8px radius, 1px neutral border. Active state uses a 2px primary color border.

### Chips & Badges
- **Discount Badge:** Circular or pill-shaped, positioned at the top-right of product images using `sale-red`.
- **Status Chips:** Used in Admin (e.g., "Delivered", "Pending") using muted versions of success/warning colors with high-contrast text.

### Navigation
- **Top Bar:** Sticky on scroll. Uses a white background to maintain clarity against colorful product photography.