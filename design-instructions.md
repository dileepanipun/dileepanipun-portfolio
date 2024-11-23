# Portfolio Design Implementation Guidelines

## Color Scheme
```scss
// Primary Colors
$primary-blue: #00ff9d;      // Lime blue for primary actions and highlights
$primary-dark: #1a1a1a;      // Dark background
$primary-white: #ffffff;      // Text and light elements
$accent-blue: #00ccbb;       // Secondary actions and hover states

// Supporting Colors
$gradient-dark: #141414;     // Darker shade for gradients
$gradient-light: #2d2d2d;    // Lighter shade for gradients
$overlay-dark: rgba(0, 0, 0, 0.7);
$success: #4CAF50;
$error: #FF5252;

// Text Colors
$text-primary: #ffffff;
$text-secondary: rgba(255, 255, 255, 0.8);
$text-muted: rgba(255, 255, 255, 0.6);
```

## Typography
```scss
// Font Stack
$primary-font: 'Inter', sans-serif;    // Main text
$heading-font: 'Space Grotesk', sans-serif;  // Headings
$mono-font: 'Fira Code', monospace;    // Code snippets

// Font Sizes
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.125rem;   // 18px
$text-xl: 1.25rem;    // 20px
$text-2xl: 1.5rem;    // 24px
$text-3xl: 1.875rem;  // 30px
$text-4xl: 2.25rem;   // 36px
```

## Layout & Spacing
```scss
// Container
$container-max: 1200px;
$container-padding: 1.5rem;

// Spacing Scale
$space-1: 0.25rem;   // 4px
$space-2: 0.5rem;    // 8px
$space-3: 0.75rem;   // 12px
$space-4: 1rem;      // 16px
$space-6: 1.5rem;    // 24px
$space-8: 2rem;      // 32px
$space-12: 3rem;     // 48px
$space-16: 4rem;     // 64px
```

## Modern UI Elements

### Glassmorphism
```scss
@mixin glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}
```

### Animations
```scss
// Smooth transitions
$transition-base: all 0.3s ease;
$transition-slow: all 0.5s ease;

// Hover effects
@mixin hover-lift {
  transition: $transition-base;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}
```

## Key Components Styling

### Navigation
- Sticky header with glass effect
- Smooth background transition on scroll
- Hamburger menu for mobile with animated transitions
- Active state indicators using primary-blue

### Hero Section
- Large, bold typography for name and tagline
- Animated gradient background
- Floating elements with subtle parallax
- CTA buttons with hover animations

### Project Cards
```scss
@mixin project-card {
  @include glass-effect;
  padding: $space-6;
  margin-bottom: $space-8;
  
  &:hover {
    transform: scale(1.02);
    border-color: $primary-blue;
  }
}
```

### Skills & Technologies
- Circular or hexagonal badges with icons
- Progress bars with glowing effects
- Interactive hover states
- Grid layout with responsive columns

### Testimonials
- Card-based layout with quotes
- Author info with small avatars
- Subtle rotation on hover
- Automated carousel for mobile

### Contact Form
- Floating labels
- Animated input fields
- Custom radio and checkbox styles
- Success/error states with animations

## Interactive Elements

### Buttons
```scss
@mixin primary-button {
  background: linear-gradient(45deg, $primary-blue, $accent-blue);
  padding: $space-3 $space-6;
  border-radius: 2rem;
  color: $primary-dark;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 255, 157, 0.3);
  }
}
```

### Links
```scss
@mixin animated-link {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: $primary-blue;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
}
```

## Responsive Design
```scss
// Breakpoints
$mobile: 640px;
$tablet: 768px;
$laptop: 1024px;
$desktop: 1280px;

// Example Media Query Mixins
@mixin mobile {
  @media (max-width: $mobile) { @content; }
}

@mixin tablet {
  @media (min-width: $mobile) and (max-width: $tablet) { @content; }
}
```

## Special Effects

### Scroll Animations
- Use Intersection Observer for reveal animations
- Stagger effects for list items
- Parallax scrolling for background elements
- Smooth scroll to section transitions

### Loading States
- Skeleton screens for content loading
- Animated placeholders
- Progress indicators
- Smooth content fade-ins

### Cursor Effects
```scss
// Custom cursor
.custom-cursor {
  width: 20px;
  height: 20px;
  border: 2px solid $primary-blue;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transition: transform 0.2s ease;
  
  &.hover {
    transform: scale(1.5);
    background: rgba(0, 255, 157, 0.1);
  }
}
```

## Performance Considerations
- Use CSS transforms for animations
- Implement lazy loading for images
- Optimize web fonts loading
- Use will-change for heavy animations
- Implement debouncing for scroll events

## Implementation Notes
1. Start with mobile-first approach
2. Implement dark theme as default
3. Ensure smooth transitions between sections
4. Add subtle micro-interactions
5. Keep accessibility in mind (contrast, focus states)
6. Use CSS Grid for main layouts
7. Implement smooth scrolling behavior
8. Add loading states for dynamic content

Would you like me to expand on any of these sections or provide more specific implementation details for any particular component?