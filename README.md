# Shadcn/ui + TailwindCSS v4

## Installation

1. Install the new version of TailwindCSS and the PostCSS plugin:

```bash
npm install tailwindcss@next @tailwindcss/postcss@next
```

---

2. Update your stylesheet and replace it with the code below:

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";

@theme {
  --color-background: #fff;
  --color-foreground: #0a0a0a;
  --color-card: #fff;
  --color-card-foreground: #0a0a0a;
  --color-popover: #fff;
  --color-popover-foreground: #0a0a0a;
  --color-primary: #171717;
  --color-primary-foreground: #fafafa;
  --color-secondary: #f5f5f5;
  --color-secondary-foreground: #171717;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #737373;
  --color-accent: #f5f5f5;
  --color-accent-foreground: #171717;
  --color-destructive: #ef4444;
  --color-destructive-foreground: #fafafa;
  --color-border: #e5e5e5;
  --color-input: #e5e5e5;
  --color-ring: #0a0a0a;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
  --color-sidebar-background: #fafafa;
  --color-sidebar-foreground: #3f3f46;
  --color-sidebar-primary: #18181b;
  --color-sidebar-primary-foreground: #fafafa;
  --color-sidebar-accent: #f4f4f5;
  --color-sidebar-accent-foreground: #18181b;
  --color-sidebar-border: #e5e7eb;
  --color-sidebar-ring: #3b82f6;
  --radius: 0.5rem;
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  /* animations */
  --animate-slideDown: accordion-down 0.2s ease-out;
  --animate-slideUp: accordion-up 0.2s ease-out;

  @keyframes accordion-down {
    from {
      height: 0px;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes accordion-up {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0px;
    }
  }
}

/* dark mode */
@variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  --color-card: #0a0a0a;
  --color-card-foreground: #fafafa;
  --color-popover: #0a0a0a;
  --color-popover-foreground: #fafafa;
  --color-primary: #fafafa;
  --color-primary-foreground: #171717;
  --color-secondary: #262626;
  --color-secondary-foreground: #fafafa;
  --color-muted: #262626;
  --color-muted-foreground: #a3a3a3;
  --color-accent: #262626;
  --color-accent-foreground: #fafafa;
  --color-destructive: #7f1d1d;
  --color-destructive-foreground: #fafafa;
  --color-border: #262626;
  --color-input: #262626;
  --color-ring: #d4d4d4;
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
  --color-sidebar-background: #18181b;
  --color-sidebar-foreground: #f4f4f5;
  --color-sidebar-primary: #1d4ed8;
  --color-sidebar-primary-foreground: #fff;
  --color-sidebar-accent: #27272a;
  --color-sidebar-accent-foreground: #f4f4f5;
  --color-sidebar-border: #27272a;
  --color-sidebar-ring: #3b82f6;
}

* {
  @apply border-border;
}
body {
  @apply bg-background text-foreground;
}
```

---

3. The `Chart` and `Sidebar` components uses the css variable values without the `var()` function which was working fine on TailwindCSS v3 but for v4 we need to wrap the values with the `var()` function.

### Chart Component

1. Find all the `bg-[--color-bg]` classnames and replace it with `bg-[var(--color-bg)]`.
2. Find all the `border-[--color-border]` classnames and replace it with `border-[var(--color-border)]`.

### Sidebar Component

1. Find all the `w-[--sidebar-width]` classnames and replace it with `w-[var(--sidebar-width)]`.
2. Find all the `w-[--sidebar-width-icon]` classnames and replace it with `w-[var(--sidebar-width-icon)]`.
3. Find all the `max-w-[--skeleton-width]` classnames and replace it with `max-w-[var(--skeleton-width)]`.

---

**Note** - The `tailwind.config.ts` is an empty file, it's just for the purpose of the shadcn/ui cli to work, we don't need it for the TailwindCSS v4 setup.
