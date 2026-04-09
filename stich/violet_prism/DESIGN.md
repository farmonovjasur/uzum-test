# Design System Specification: The Fluid Marketplace

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Atelier"**
This design system moves beyond the generic "e-commerce grid" to create a space that feels curated, premium, and architecturally sound. While inspired by the efficiency of Uzum Market, our goal is to elevate the experience into an editorial-grade interface. 

We achieve this through **Asymmetric Sophistication**: breaking the rigid 12-column expectations with generous whitespace (negative space as a luxury), overlapping product imagery, and a "Tonal Layering" approach to depth. This system treats every product card not as a box, but as a pedestal. It is professional, trustworthy, and unapologetically modern.

---

## 2. Colors & Surface Logic
The palette is anchored by the authoritative **Deep Purple (#7000ff)**, supported by a sophisticated range of cool grays and whites that prioritize breathability.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts or tonal transitions. To separate a "Flash Sale" section from the "Main Feed," transition from `surface` (#f6f6f8) to `surface-container-low` (#f0f1f3).

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
*   **Base:** `surface` (#f6f6f8)
*   **Sectioning:** `surface-container` (#e7e8ea)
*   **Elevated Content:** `surface-container-lowest` (#ffffff) for primary product cards to make them "pop" against the gray base.

### The "Glass & Gradient" Rule
To avoid a flat, "Bootstrap" appearance:
*   **Glassmorphism:** Use `surface-container-lowest` with a 70% opacity and a `24px` backdrop-blur for floating navigation bars or filter drawers.
*   **Signature Textures:** Main CTAs should utilize a subtle linear gradient: `primary` (#7000ff) to `primary_container` (#af8dff) at a 135° angle. This adds "soul" and a tactile, vibrant quality to the buttons.

---

## 3. Typography: Editorial Clarity
We utilize **Inter** for its mathematical precision and neutral warmth. The hierarchy is designed to lead the eye through a narrative, not just a list of specs.

*   **Display (lg/md/sm):** Used for hero marketing beats. Low tracking (-2%) to feel tight and custom.
*   **Headline (lg/md):** Primary navigation and category titles. Use `on_surface` (#2d2f31).
*   **Title (lg/md/sm):** Product names in cards. `title-md` is the workhorse for high-readability in dense grids.
*   **Body (lg/md/sm):** All descriptive text. Use `on_surface_variant` (#5a5c5d) for secondary descriptions to reduce visual noise.
*   **Label (md/sm):** Used for "New," "Sale," or "Top Seller" badges. Always uppercase with +5% letter spacing for a premium feel.

---

## 4. Elevation & Depth
We reject the traditional "drop shadow" in favor of **Tonal Layering** and **Ambient Light.**

*   **The Layering Principle:** Depth is achieved by stacking. Place a `surface-container-lowest` card on a `surface-container-low` section. The contrast in hex codes provides enough "lift" without visual clutter.
*   **Ambient Shadows:** For "Floating" elements (e.g., a Quick-Buy modal), use: `box-shadow: 0 20px 40px rgba(112, 0, 255, 0.06);`. Notice the shadow is tinted with our `primary` color, mimicking how light reflects off a purple surface.
*   **The "Ghost Border":** If a border is required for accessibility in input fields, use `outline_variant` (#acadaf) at **20% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons (The "Power" Components)
*   **Primary:** Gradient fill (`primary` to `primary_container`), `radius-full`, `label-md` (Medium weight). High vibration.
*   **Secondary:** `surface-container-highest` background with `primary` text. No border.
*   **Tertiary:** Transparent background, `primary` text, with an underline that appears only on hover.

### Cards (The "Pedestal")
*   **Style:** `radius-lg` (2rem) or `radius-md` (1.5rem).
*   **Layout:** Forbid divider lines. Use `spacing-md` (1.5rem) of vertical white space to separate the product image from the price.
*   **Hover State:** On hover, the card should scale (1.02x) and the shadow should shift from 4% to 8% opacity.

### Chips & Badges
*   **Selection Chips:** Use `secondary_container` (#e4c6ff) with `on_secondary_container` (#602c91) text. These should feel "soft" and clickable.
*   **Status Badges:** Use `tertiary_container` (#ff8eaf) for "Limited Stock" to provide a sophisticated alternative to "Standard Red."

### Input Fields
*   **Style:** Background `surface-container-low`, `radius-sm` (0.5rem).
*   **Focus:** The "Ghost Border" becomes `primary` at 100% opacity, and the background shifts to `surface-container-lowest` (pure white).

---

## 6. Do's and Don'ts

### Do:
*   **Do** use intentional asymmetry. A large product image can bleed off the edge of a container to create movement.
*   **Do** prioritize the `surface-container` scale for depth.
*   **Do** use `radius-xl` (3rem) for large promotional banners to emphasize the friendly, modern aesthetic.

### Don't:
*   **Don't** use black (#000000) for text. Use `on_surface` (#2d2f31) to maintain a soft, high-end contrast.
*   **Don't** use 1px dividers. If you need to separate content, use a 8px height `surface-container` block or simply more whitespace.
*   **Don't** use standard "Error Red." Use our `error` (#b41340) and `error_container` (#f74b6d) tokens for a more integrated, designer-curated palette.

---

## 7. Roundedness Scale
*   **none:** 0px (Prohibited)
*   **sm:** 0.5rem (Inputs, Small Badges)
*   **DEFAULT:** 1rem (Standard Buttons)
*   **md:** 1.5rem (Standard Product Cards)
*   **lg:** 2rem (Featured Hero Cards)
*   **xl:** 3rem (Marketing Banners)
*   **full:** 9999px (Pill Buttons, Tags)