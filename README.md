# Figma Token Button

A React + TypeScript + Vite button component whose styling comes entirely from Figma design tokens.

## Pipeline

```
Figma variables -> tokens/tokens.json -> Style Dictionary -> src/styles/tokens.css -> Button.css
```

## Project structure

| Path                       | Purpose                                                                           |
| -------------------------- | --------------------------------------------------------------------------------- |
| `tokens/tokens.json`       | Tokens exported from Figma (`viewports: desktop`, `semantic-colors: Light-Basic`) |
| `scripts/build-tokens.mjs` | Style Dictionary build with a custom parser for the flat Figma export             |
| `src/styles/tokens.css`    | Generated CSS variables. Do not edit by hand                                      |
| `src/components/Button/`   | `Button.tsx` and `Button.css`                                                     |
| `src/main.tsx`             | Imports `tokens.css` once at the app root                                         |
| `src/App.tsx`              | Demo page with the button, with and without an icon                               |

## Getting started

```bash
npm install
npm run tokens   # regenerate src/styles/tokens.css
npm run dev      # start the dev server
npm run build    # type-check and production build
```

## How it was built

1. **Scaffold:** Vite with the `react-ts` template.
2. **Save tokens:** the Figma export is stored in `tokens/tokens.json`.
3. **Transform tokens:** `style-dictionary` is installed as a dev dependency. `scripts/build-tokens.mjs` does the following:
   - Nests the flat `"a/b/c": value` keys so Style Dictionary can read them.
   - Appends `px` to numeric values.
   - Maps the weight `medium` to `500`.
   - Includes `unboundValues` (`gap`, `iconWidth`, `iconHeight`) with an `unbound-` prefix.
   - Skips `instanceSize`, which describes the Figma instance and is not a style token.
4. **Build the component:** `Button` is a primary button with an optional trailing `icon`. `Button.css` references only token variables.
5. **Wire up:** `src/styles/tokens.css` is imported in `src/main.tsx`, and `App.tsx` renders the demo.

## Token to CSS mapping

| Token                                            | CSS variable                                                                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `action/button-primary/padding-{t,r,b,l}`        | `--action-button-primary-padding-*`                                                                                         |
| `action/button-primary/radius-{t-l,t-r,b-l,b-r}` | `--action-button-primary-radius-*`                                                                                          |
| `action/button-primary/border-default`           | `--action-button-primary-border-default`                                                                                    |
| `action/button-primary/button-min-w`             | `--action-button-primary-button-min-w`                                                                                      |
| `background/bg-primary-default`                  | `--background-bg-primary-default`                                                                                           |
| `border/bdr-primary-default`                     | `--border-bdr-primary-default`                                                                                              |
| `foreground/fg-primary-on-it-default`            | `--foreground-fg-primary-on-it-default`                                                                                     |
| `typo/*`                                         | `--typo-name-gotham`, `--typo-weight-medium`, `--typo-size-style6`, `--typo-line-height-lh-6`, `--typo-letter-spacing-ls-6` |
| `unboundValues`                                  | `--unbound-gap`, `--unbound-icon-width`, `--unbound-icon-height`                                                            |

## Usage

```tsx
import { Button } from "./components/Button/Button";

<Button>Button</Button>
<Button icon={<ArrowIcon />}>With icon</Button>
```

## Updating from Figma

1. Replace `tokens/tokens.json` with the new export.
2. Run `npm run tokens`.
3. Never hardcode values in the component. Change the token instead.

## Known limitations

- Only the default state of the primary button is tokenized. Hover, active, disabled, size and variant tokens are not available yet.
- `letter-spacing` is emitted as `px`. If Figma means a percentage, adjust it in `scripts/build-tokens.mjs`.
- The `Gotham` font is referenced by name only. No font files are bundled, so it falls back to `sans-serif` unless the font is installed or loaded separately.
