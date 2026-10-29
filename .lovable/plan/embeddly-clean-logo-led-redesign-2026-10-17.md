# Embeddly — Clean, Logo-Led Redesign

## Visual direction
A light, professional website built around the official Embeddly logo's deep purple. Replace the navy background and blue-to-purple effects with clear typography, generous spacing, flat colours and restrained borders.

### Proposed palette
| Role | Colour | Use |
| --- | --- | --- |
| Primary | Logo purple `#261059` | Main buttons, headings and selected menu links |
| Secondary | Muted sage `#6B7A45` | Small complementary accents and selected information highlights |
| Background | White `#FFFFFF` | Main page surfaces |
| Alternate background | Cool light grey `#F5F5F7` | Gentle separation between sections |
| Text | Charcoal `#24212A` | High-contrast body text |

The sage accent provides a softened yellow-green counterpoint to purple; it will stay secondary rather than compete with the logo. Keep both official logos unchanged, including the supplied Squaroots image.

## Changes across the website
- Remove all decorative gradients, glowing buttons, blurred colour blobs, pulsing effects and floating glows.
- Use solid purple main buttons with clear, subtle interaction states; secondary buttons use a simple outline.
- Retain the existing sans-serif fonts, with clearer hierarchy and comfortable reading widths.
- Simplify the header and footer, showing the Embeddly logo directly against the light background without its white chip.
- Replace decorative grid backgrounds and oversized rounded containers with clean page sections, fine borders and small corner radii for individual items.
- Keep hardware and achievement photos visible and unaltered. The homepage photo can use a flat purple overlay for readable text, not a gradient.
- Keep number counters, but remove other attention-seeking animation; honour reduced-motion preferences.

## Page treatment
- **Home:** a clear introduction, venue and proposed date, solid registration button, readable programme facts and the trainer profile.
- **Training Program:** tidy programme details, learning topics and benefits; keep the trainer profile and a prominent, solid-purple “Full profile & achievements” button.
- **Trainer:** professional photo-led profile and a clean achievement gallery.
- **About, Learning Experience, FAQ and Contact:** apply the same palette, spacing, typography and simple borders consistently.

## Keep unchanged
- All seven pages and their existing information.
- The 24-seat batch size, approximate two-week duration, component-kit details, venue and proposed start date.
- Trainer credentials, achievement photos, contact details and LinkedIn links.
- Every registration/application button continues to open the existing Razorpay page in a new tab.
- No new payment setup, accounts or services.

## Technical details
- Define the palette through semantic design tokens in the global stylesheet; shared controls consume those tokens consistently.
- Update shared page elements and route presentation together, removing obsolete gradient/glow styles rather than hiding them.
- Preserve unique page titles and descriptions.
- Check desktop and mobile layouts, image visibility, colour contrast and absence of overflow. Verify registration links and the trainer-profile navigation on both Home and Training Program.