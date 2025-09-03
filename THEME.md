# Theme System Documentation

This project uses a centralized theme system to maintain consistent design tokens across the application.

## Files

- **`src/theme.css`** - CSS custom properties (variables) for styling
- **`src/theme.js`** - JavaScript theme object for use in React components
- **`src/main.jsx`** - Imports the theme at the application level

## Usage

### In CSS Files

The theme variables are automatically available in all CSS files since they're imported at the application level:

```css
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-normal);
}
```

### In React Components

Import the theme object to use design tokens in JavaScript:

```jsx
import { theme } from '../theme'

function MyComponent() {
  return (
    <div style={{
      backgroundColor: theme.colors.bg.primary,
      color: theme.colors.text.primary,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.medium,
      transition: theme.transition.normal
    }}>
      Content
    </div>
  )
}
```

### Dynamic Theme Changes

Use the helper functions to dynamically change theme values:

```jsx
import { setCSSVariable, getCSSVariable } from '../theme'

// Change a color dynamically
setCSSVariable('--color-primary', '#ff6b6b')

// Get current value
const currentPrimary = getCSSVariable('--color-primary')
```

## Available Design Tokens

### Colors
- **Primary**: `--color-primary`, `--color-primary-hover`, `--color-primary-light`, etc.
- **Background**: `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
- **Text**: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- **Border**: `--color-border-primary`, `--color-border-secondary`
- **Button**: `--color-btn-primary`, `--color-btn-danger`, etc.
- **Status**: `--color-success`, `--color-danger`, etc.

### Spacing
- **Scale**: `--spacing-xs` (4px) to `--spacing-3xl` (32px)

### Border Radius
- **Scale**: `--radius-sm` (4px) to `--radius-xl` (12px)

### Typography
- **Font Sizes**: `--font-size-xs` (10px) to `--font-size-4xl` (24px)
- **Font Weights**: `--font-weight-normal` (400), `--font-weight-medium` (500), `--font-weight-semibold` (600)

### Transitions
- **Speed**: `--transition-fast` (0.15s), `--transition-normal` (0.2s), `--transition-slow` (0.3s)

### Z-Index
- **Layers**: `--z-dropdown` (9999), `--z-modal` (1000), `--z-tooltip` (100)

## Benefits

1. **Centralized Management**: All design tokens are defined in one place
2. **Consistency**: Ensures consistent values across the application
3. **Easy Theming**: Change the entire app's appearance by modifying theme values
4. **Type Safety**: JavaScript theme object provides autocomplete and type checking
5. **Performance**: CSS variables are optimized by the browser
6. **Maintainability**: Easy to update and maintain design system

## Adding New Design Tokens

1. Add the variable to `src/theme.css`
2. Add the corresponding value to `src/theme.js`
3. Use the new token in your components

## Example: Adding a New Color

```css
/* In theme.css */
:root {
  --color-accent: #ff6b6b;
}
```

```js
// In theme.js
export const theme = {
  colors: {
    accent: '#ff6b6b',
    // ... other colors
  }
}
```

```jsx
// In your component
import { theme } from '../theme'

<div style={{ backgroundColor: theme.colors.accent }}>
  Or use CSS: <div className="accent-bg">
</div>
```

```css
/* In your CSS */
.accent-bg {
  background-color: var(--color-accent);
}
```
