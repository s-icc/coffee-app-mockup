# Broonic design system

## Visual idea

The supplied Broonic identity is bold, warm, and social: an oversized cream wordmark, a French bulldog mascot, dense display type, and generous fields of burgundy and paper. The landing page treats the logo as the central graphic. The app translates the same art direction into compact, readable controls.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Burgundy | `#790514` | Primary brand field, CTAs, key type |
| Deep burgundy | `#610010` | Depth and strong contrast |
| Soft burgundy | `#922334` | Hover and motion accents |
| Cream | `#F0E8DC` | Editorial page background |
| Sand | `#E4D4BF` | Warm panels and cards |
| Paper | `#FBF7EF` | App canvas and reading surfaces |
| Ink | `#231A18` | Supporting headlines and body |
| Muted | `#746B63` | Secondary text |

The hex values are design tokens chosen to sit with the supplied raster artwork. Minor red variation inside the original images is preserved.

## Typography

- **Brand lockup:** the exact wordmark and hand-lettered tagline from the supplied images, used as artwork. The reference does not include an editable font file.
- **Display companion:** Archivo Black at tight tracking for large headlines and interface headings. It echoes the mass of the custom logo lettering.
- **Body and controls:** DM Sans, typically 400–800 weight.
- **Labels:** uppercase, 10–11 px, bold, with expanded tracking.

## Components

- Round mascot seal and large wordmark; maintain their original proportions.
- Burgundy pill CTA and underlined editorial text link.
- Paper product cards with simple cup art, clear price, and circular add control.
- Sand check-in and rewards panels.
- Five-position app navigation with a raised order action.

## Layout and animation

The landing uses large type, broad negative space, one editorial illustration panel, a typographic club section, three menu previews, and an app preview. The app fills small screens and uses a framed 430 px presentation on desktop. GSAP animates the hero and reveals content on scroll; ScrollTrigger moves the round mark through the club section. Motion is disabled under `prefers-reduced-motion`.
