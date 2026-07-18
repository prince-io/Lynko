# components/appearance — Dashboard Appearance Tab

## Ownership

Owns the Appearance dashboard tab and all its customization pickers.

## Components

| Component | Type | Options source |
|-----------|------|----------------|
| `AppearanceTab` | Main tab | Orchestrates design state, save/reset, renders pickers + preview |
| `AppearancePreview` | Preview | Phone-style preview of the user's current design |
|-----------|------|----------------|
| `ThemeDropdown` | Dropdown | `THEMES` (35 DaisyUI theme names) |
| `FontDropdown` | Dropdown | `FONT` (10 fonts matching CSS variables in `app/layout.js`) |
| `TextScaleSlider` | Range slider | `SIZE` (6 scale levels, each an array of 4 Tailwind text classes) |
| `CornerRadiusSlider` | Range slider | `RADIUS` (6 radius class values) |
| `BorderStyleRadio` | Radio group | `BORDER` (5 styles: none, solid, dashed, dotted, double) |
| `AvatarShapeRadio` | Radio group | `AVATAR` (7 shapes including mask classes) |
| `ButtonStyleRadio` | Radio group | `BTN` (4 styles: solid, soft, outline, dash) |
| `ButtonShapeRadio` | Radio group | `BTNRAD` (2 shapes: rounded, square) |
| `BackgroundStyleDropdown` | Dropdown | `BG` (10 options: primary, secondary, 8 gradient directions) |

## Local Contracts

- Each component receives two props: a `value` (current selection) and an `onChange(newValue)` callback
- Components do not import `setDesign` — they emit the new value upward
- All source constants come from `@/lib/designOptions`
- Components are `"use client"` because they use browser events and state (controlled inputs)

## Work Guidance

- Font values must match `--font-<value>` CSS variables loaded in `app/layout.js` — adding a new font requires updates in `lib/designOptions.js`, `app/layout.js`, and `app/globals.css`
- `TextScaleSlider` and `CornerRadiusSlider` own their index-to-value mapping internally

## Verification

No appearance-specific tests exist.
## Child DOX Index

None.
