# Design Brief: EduCampus Smart Notice Board

## Visual Direction

Modern, professional productivity app for educational institutions. Clean hierarchy, approachable tone, refined dark/light mode.

## Palette

| Token | Light (L C H) | Dark (L C H) | Usage |
|-------|---------------|-------------|-------|
| Primary | 0.52 0.15 265 | 0.75 0.18 265 | Actions, accents, sidebar highlights |
| Destructive | 0.62 0.22 12 | 0.68 0.2 12 | Delete, dangerous actions |
| Chart-1 | 0.62 0.21 257 | 0.72 0.22 257 | Analytics (blue) |
| Chart-2 | 0.68 0.19 151 | 0.75 0.21 151 | Analytics (green) |
| Chart-3 | 0.65 0.18 94 | 0.72 0.2 94 | Analytics (orange) |
| Chart-4 | 0.58 0.17 35 | 0.68 0.19 35 | Analytics (warm) |
| Chart-5 | 0.74 0.16 270 | 0.78 0.19 270 | Analytics (purple) |
| Tag-Academic | 0.58 0.21 265 | 0.68 0.22 265 | Category tag badge |
| Tag-Event | 0.62 0.24 142 | 0.72 0.26 142 | Category tag badge |
| Tag-Sports | 0.68 0.21 60 | 0.75 0.23 60 | Category tag badge |
| Tag-General | 0.65 0.03 0 | 0.58 0.03 0 | Category tag badge |

## Typography

| Role | Font | Weight | Scale |
|------|------|--------|-------|
| Display | General Sans | 600–700 | 28px–40px (headings) |
| Body | DM Sans | 400–500 | 14px–16px (content) |
| Mono | Geist Mono | 400 | 12px–14px (code, details) |

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Sidebar | Subtle elevation, border-right, consistent background |
| Header/Top bar | Light hover state, theme toggle, clear hierarchy |
| Notice Cards | Gradient background, shadow-card, hover lift animation |
| Charts | Chart colors mapped to palette, clean axes |
| Modal/Forms | Popover background, shadow-elevated, smooth fade-in |

## Spacing & Rhythm

Sidebar: compact (1rem gaps). Main content: generous (1.5rem–2rem gaps). Cards: 1.25rem internal padding.

## Component Patterns

- **Cards**: bg-gradient-card, shadow-card, hover:shadow-card-hover + translate
- **Tags**: Semantic color classes (.tag-academic, .tag-event, .tag-sports, .tag-general)
- **Buttons**: Primary (teal gradient), secondary (muted), destructive (red)
- **Inputs**: bg-input, border-border, focus:ring-primary
- **Theme toggle**: Smooth transition-smooth on all elements

## Motion

- Transitions: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Animations: fade-in (0.4s), slide-up (0.5s), pulse-soft (2s loop)
- Card hover: shadow lift + subtle scale

## Responsive

Mobile-first. Sidebar collapses to icon-only on `sm`, hides entirely on mobile with hamburger menu. Main content takes full width.

## Signature Detail

Category tags with distinct saturated colors (Academic blue, Event green, Sports orange, General gray) provide visual scanning advantage. Tags are always visible on cards, supporting quick categorization without reading titles.
