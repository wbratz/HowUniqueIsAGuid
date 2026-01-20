# CLAUDE.md — AI Assistant Guide for HowUniqueIsAGuid

**Repository**: https://github.com/wbratz/HowUniqueIsAGuid
**Purpose**: Educational single-page React application explaining GUID uniqueness through interactive visualizations and mathematical calculations
**Last Updated**: 2026-01-20

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Code Conventions](#code-conventions)
6. [Component Architecture](#component-architecture)
7. [Styling Guidelines](#styling-guidelines)
8. [TypeScript Conventions](#typescript-conventions)
9. [Animation Patterns](#animation-patterns)
10. [Key Utilities](#key-utilities)
11. [Common Tasks](#common-tasks)
12. [Git Workflow](#git-workflow)

---

## Project Overview

### What This Project Does

This is a production-ready, educational single-page application that answers: **"How unique is a GUID?"**

**Key Features**:
- Interactive 128-bit GUID visualization
- Birthday paradox probability calculator
- Relatable comparisons (lottery odds, dice sequences)
- "Witness" probability calculator (probability YOU encounter a collision)
- Secure v4 GUID generator with copy functionality
- Code samples in multiple programming languages
- Parallax starfield background animation

**Target Audience**: Developers, engineers, and technically-minded individuals interested in understanding GUID collision probability

**Design Philosophy**:
- Dark theme only (optimized for readability)
- Glassmorphism aesthetic (frosted glass cards with backdrop blur)
- Educational content with both "speakable" numbers and mathematical precision
- Scroll-triggered animations for progressive disclosure
- Mobile-responsive with touch-friendly interactions

---

## Tech Stack

### Core Framework
- **React** 18.3.1 - Functional components with hooks
- **TypeScript** 5.4.5 - Strict mode enabled
- **Vite** 5.4.2 - Build tool and dev server

### Styling & UI
- **Tailwind CSS** 3.4.10 - Utility-first styling
- **Framer Motion** 11.2.14 - Scroll-triggered animations
- **Lucide React** 0.470.0 - Icon library

### Mathematics & Utilities
- **Decimal.js-light** 2.5.1 - Arbitrary-precision decimal arithmetic for large numbers (2^128, etc.)

### Development Tools
- **Prettier** 3.3.3 - Code formatting
- **PostCSS** 8.4.39 + **Autoprefixer** 10.4.19 - CSS processing

### Browser APIs Used
- **Web Crypto API** - Secure GUID generation (`crypto.getRandomValues`)
- **Canvas API** - Parallax starfield animation
- **Clipboard API** - Copy-to-clipboard functionality
- **Intersection Observer** (via Framer Motion) - Scroll-triggered animations

---

## Project Structure

```
/
├── index.html               # Entry HTML file
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind theme customization
├── tsconfig.json            # TypeScript compiler options
├── .prettierrc              # Prettier formatting rules
├── README.md                # User-facing documentation
├── CLAUDE.md                # This file - AI assistant guide
│
├── public/
│   └── og-image.svg         # Open Graph image for social sharing
│
└── src/
    ├── main.tsx             # React DOM render entry point
    ├── App.tsx              # Main app component (orchestrates sections)
    ├── index.css            # Global styles + Tailwind imports
    │
    ├── lib/
    │   └── math.ts          # Mathematical utilities and constants
    │
    └── components/
        ├── Header.tsx                   # Sticky navigation header
        ├── Hero.tsx                     # Hero section with bit grid
        ├── BitGrid.tsx                  # Interactive 128-bit visualization
        ├── ParallaxStars.tsx            # Canvas-based starfield background
        ├── StatGrid.tsx                 # Animated statistics cards
        ├── ProbabilityCalculator.tsx    # Birthday paradox calculator
        ├── DeepComparisons.tsx          # Universe/atoms comparisons
        ├── RelatableScenarios.tsx       # Lottery/dice/code comparisons
        ├── LayersExplainer.tsx          # Three-layer collision explanation
        ├── WitnessCalculator.tsx        # Advanced probability calculator
        ├── Generator.tsx                # GUID generation tool
        ├── CodeSamples.tsx              # Multi-language code snippets
        ├── Summary.tsx                  # Wrap-up section
        └── Sources.tsx                  # Citation references
```

### Directory Responsibilities

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `/src/lib/` | Pure utility functions, mathematical calculations, constants | `math.ts` |
| `/src/components/` | React UI components (one component per file) | All `.tsx` files |
| `/public/` | Static assets served as-is | `og-image.svg` |
| Root | Configuration files | `vite.config.ts`, `tailwind.config.js`, `tsconfig.json` |

---

## Development Workflow

### Initial Setup

```bash
# Install dependencies (requires Node 18+)
npm install

# Start development server (opens http://localhost:5173)
npm run dev

# Format code with Prettier
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start dev server on port 5173 with hot reload |
| `build` | `tsc -b && vite build` | Type-check and build for production |
| `preview` | `vite preview` | Preview production build locally |
| `format` | `prettier --write .` | Format all files with Prettier |

### Development Server Configuration

**Port**: 5173 (configured in `vite.config.ts`)
**Auto-open**: Browser opens automatically on `npm run dev`
**Hot Reload**: File changes trigger instant updates without full page reload

### Build Output

- **Target**: ES2020 (configured in `vite.config.ts`)
- **Output Directory**: `/dist`
- **Optimizations**: Tree-shaking, minification, code splitting

---

## Code Conventions

### General Principles

1. **Simplicity over abstraction** - Avoid premature optimization
2. **One component per file** - File name matches component name
3. **Pure functions preferred** - Keep side effects in `useEffect`
4. **Immutable state updates** - Never mutate state directly
5. **Declarative over imperative** - Let React handle DOM updates

### File Naming

- **Components**: PascalCase (e.g., `BitGrid.tsx`, `ProbabilityCalculator.tsx`)
- **Utilities**: camelCase (e.g., `math.ts`)
- **Config files**: kebab-case (e.g., `vite.config.ts`, `tailwind.config.js`)

### Code Formatting (Prettier)

```json
{
  "semi": false,                 // No semicolons
  "singleQuote": true,           // Use 'single quotes' for strings
  "trailingComma": "all",        // Trailing commas everywhere
  "printWidth": 100              // 100 character line width
}
```

**IMPORTANT**: Always run `npm run format` before committing.

### Import Organization

```typescript
// 1. External dependencies
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

// 2. Internal utilities
import { collisionProbability, SPACE_122 } from '../lib/math'

// 3. Type definitions (if not inline)
import type { SampleKey } from './types'
```

### Comment Style

- **Avoid obvious comments** - Code should be self-documenting
- **Explain "why" not "what"** - Only comment non-obvious decisions
- **Use JSDoc for complex functions** - Especially in `lib/math.ts`

```typescript
// ❌ Bad: Obvious comment
// Set bits to empty array
const [bits, setBits] = useState<boolean[]>([])

// ✅ Good: Explains "why"
// Version 4 GUID: set version bits (4) and variant bits (10)
bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40
bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80
```

---

## Component Architecture

### Component Patterns

#### 1. Pure Presentational Components

**Characteristics**:
- No internal state
- Props-driven rendering
- No side effects
- Reusable

**Example**: `LayersExplainer.tsx`

```typescript
export default function LayersExplainer() {
  const cards = [
    { icon: <Cog />, title: 'Generate', text: 'System creates GUID...' },
    { icon: <Eye />, title: 'Expose', text: 'You see fraction e...' },
    { icon: <User />, title: 'Recognize', text: 'You notice collision...' }
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.h2 {...fadeInUp}>Three Layers</motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div key={i} {...cardAnimation}>
            {c.icon}
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

#### 2. Stateful Container Components

**Characteristics**:
- Manages local state with `useState`
- Handles user interactions
- Computes derived values with `useMemo`
- May have side effects in `useEffect`

**Example**: `ProbabilityCalculator.tsx`

```typescript
export default function ProbabilityCalculator() {
  const [nStr, setNStr] = useState<string>('')

  const result = useMemo(() => {
    const clean = nStr.replace(/[,_\s]/g, '')
    if (!clean.trim()) return { text: '—', interp: '' }

    try {
      const N = new Decimal(clean)
      const p = collisionProbability(N, SPACE_122).mul(100)
      return { text: p.toFixed(6) + '%', interp: `Equivalent to...` }
    } catch {
      return { text: 'Invalid', interp: '' }
    }
  }, [nStr])

  return (
    <section>
      <input
        value={nStr}
        onChange={(e) => setNStr(e.target.value)}
        placeholder="e.g., 1000000 or 1e9"
      />
      <p>{result.text}</p>
      <p>{result.interp}</p>
    </section>
  )
}
```

### State Management Philosophy

**NO GLOBAL STATE** - This project intentionally avoids:
- Redux / Zustand / Jotai
- React Context (except Framer Motion's built-in)
- URL state / query parameters

**Reasoning**: The application is a linear narrative with no routing or shared state needs.

**State Location Rules**:
1. **Component-local state** - Default choice (`useState`)
2. **Derived state** - Use `useMemo` for expensive calculations
3. **Ref-based state** - Use `useRef` for values that don't trigger re-renders (e.g., canvas refs, scroll position)

### Effect Cleanup Pattern

**ALWAYS clean up side effects** to prevent memory leaks:

```typescript
useEffect(() => {
  const handleScroll = () => {
    scrollRef.current = window.scrollY
  }

  const throttledScroll = throttle(handleScroll, 100)
  window.addEventListener('scroll', throttledScroll)

  // ✅ Cleanup function
  return () => window.removeEventListener('scroll', throttledScroll)
}, [])
```

### Component Communication

Since components are stacked vertically with no nesting (see `App.tsx`), they **DO NOT** communicate with each other.

**Pattern**: Each section is **completely independent**.

```typescript
// App.tsx
export default function App() {
  return (
    <div>
      <ParallaxStars />
      <Header />
      <main>
        <Hero />           {/* Independent */}
        <StatGrid />       {/* Independent */}
        <DeepComparisons />{/* Independent */}
        {/* ... */}
      </main>
    </div>
  )
}
```

---

## Styling Guidelines

### Tailwind Configuration

**Theme Extensions** (`tailwind.config.js`):

```javascript
colors: {
  'bg': '#0b0f17',              // Dark background
  'card': 'rgba(255,255,255,0.04)',
  'accent': '#7c3aed'           // Purple accent
}

boxShadow: {
  'glow': '0 0 64px rgba(124, 58, 237, 0.35)'
}

backgroundImage: {
  'grid': 'radial-gradient(...)',  // Subtle dot grid pattern
  'glow': 'radial-gradient(...)'   // Mouse-tracking gradient
}
```

### Custom CSS Classes

**ONLY ONE custom utility class exists**: `.backdrop-blur-card`

```css
/* src/index.css */
.backdrop-blur-card {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
}
```

**Usage**: Applied to all card-like elements for glassmorphism effect.

```tsx
<div className="backdrop-blur-card rounded-2xl p-6 shadow-lg">
  {/* Card content */}
</div>
```

### Styling Patterns

#### 1. Glassmorphism Cards

```tsx
<div className="backdrop-blur-card rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-colors">
  {/* Content */}
</div>
```

#### 2. Text Hierarchy

```tsx
<h2 className="text-4xl font-bold text-white">Main Heading</h2>
<h3 className="text-2xl font-semibold text-white/90">Subheading</h3>
<p className="text-lg text-white/70">Body text</p>
<p className="text-sm text-white/60">Muted text</p>
```

**Opacity Scale**:
- `text-white` (100%) - Primary content
- `text-white/90` (90%) - Subheadings
- `text-white/70` (70%) - Body text
- `text-white/60` (60%) - Muted/secondary text
- `text-white/40` (40%) - Disabled/placeholder text

#### 3. Responsive Grid Layouts

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {/* Items auto-arrange into columns based on breakpoint */}
</div>
```

**Breakpoints**:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

#### 4. Interactive States

```tsx
<button className="
  bg-accent text-white
  hover:bg-accent/90          /* Darken on hover */
  focus:ring-2 focus:ring-accent/50  /* Accessible focus ring */
  transition-all duration-200  /* Smooth transitions */
">
  Click me
</button>
```

#### 5. Spacing Rhythm

**Vertical Spacing**:
- Section padding: `py-20` (80px)
- Card gaps: `gap-6` (24px)
- Text spacing: `mt-4` (16px) between paragraphs

```tsx
<section className="mx-auto max-w-6xl px-6 py-20">
  <h2 className="text-4xl font-bold">Title</h2>
  <p className="mt-4 text-lg">Paragraph</p>
  <div className="mt-8 grid gap-6">
    {/* Cards */}
  </div>
</section>
```

### Color Usage Guidelines

| Element | Class | Purpose |
|---------|-------|---------|
| Background | `bg-bg` | Main page background |
| Cards | `backdrop-blur-card` | Glassmorphism cards |
| Primary actions | `bg-accent` | Buttons, links, highlights |
| Headings | `text-white` | Maximum contrast |
| Body text | `text-white/70` | Readable but not harsh |
| Borders | `border-white/10` | Subtle separation |
| Hover states | `hover:bg-white/15` | Interactive feedback |

### Accessibility Considerations

```tsx
// ✅ Semantic HTML
<button type="button" aria-label="Copy GUID">Copy</button>

// ✅ Focus states
<input className="focus:ring-2 focus:ring-accent/50" />

// ✅ Hide decorative elements from screen readers
<canvas aria-hidden="true" />

// ✅ Sufficient contrast (WCAG AA compliant)
<p className="text-white/70">Text meets 4.5:1 contrast ratio</p>
```

---

## TypeScript Conventions

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,                       // Enable all strict checks
    "noUncheckedIndexedAccess": true,     // Prevent unsafe array access
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  }
}
```

### Type Definition Patterns

#### 1. Inline Prop Types (Preferred)

```typescript
function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.001,
  suffix = ''
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  suffix?: string
}) {
  // Component implementation
}
```

#### 2. Type Exports (for reusable types)

```typescript
// lib/math.ts
export type Num = Decimal | number | string

// components/CodeSamples.tsx
type SampleKey = keyof typeof samples
```

#### 3. Const Assertions

```typescript
const samples = {
  javascript: { label: 'JavaScript', lines: [...] },
  python: { label: 'Python', lines: [...] },
  csharp: { label: 'C#', lines: [...] },
} as const

type SampleKey = keyof typeof samples
```

**Benefit**: `SampleKey` is inferred as `"javascript" | "python" | "csharp"` (literal types)

### Non-Null Assertions

**Use sparingly** - Only when you're certain a value exists:

```typescript
// ✅ Safe: Canvas ref is guaranteed to exist after mount
const canvas = canvasRef.current!
const ctx = canvas.getContext('2d')!

// ❌ Unsafe: Array access without bounds checking
const firstItem = items[0]!  // May be undefined if array is empty
```

### Type Guards

```typescript
// Number validation
if (typeof value === 'number' && Number.isFinite(value)) {
  // value is finite number
}

// Decimal validation
try {
  const d = new Decimal(input)
  if (d.isFinite()) {
    // d is valid Decimal
  }
} catch {
  // Invalid number format
}
```

### Return Type Annotations

**Explicit return types preferred** for exported functions:

```typescript
// ✅ Explicit return type
export function collisionProbability(n: Num, space: Num = SPACE_122): Decimal {
  const N = new Decimal(n)
  // ...
  return result
}

// ❌ Inferred return type (harder to catch mistakes)
export function collisionProbability(n: Num, space: Num = SPACE_122) {
  // ...
}
```

---

## Animation Patterns

### Framer Motion Usage

**All animations use Framer Motion** - No custom CSS animations or transitions.

### Pattern 1: Fade In on Scroll

```typescript
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Section Title
</motion.h2>
```

**Key Properties**:
- `initial` - Starting state (hidden, 20px down)
- `whileInView` - Target state when scrolled into view
- `viewport={{ once: true }}` - Animate only once (don't re-trigger on scroll up)
- `transition` - Animation timing

### Pattern 2: Staggered Animations

```typescript
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: i * 0.05  // 50ms stagger between items
    }}
  >
    {item.content}
  </motion.div>
))}
```

### Pattern 3: Motion Values + Transforms

**For animating numbers without re-renders**:

```typescript
import { useMotionValue, useTransform, animate } from 'framer-motion'

function AnimatedCounter({ num }: { num: number }) {
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString())

  const { ref, inView } = useInView({ once: true })

  useEffect(() => {
    if (inView) {
      animate(motionValue, num, {
        duration: 1.2,
        ease: 'easeOut'
      })
    }
  }, [inView, num, motionValue])

  return (
    <motion.span ref={ref}>
      {display}
    </motion.span>
  )
}
```

**Explanation**:
- `useMotionValue(0)` - Creates animatable value starting at 0
- `useTransform()` - Transforms motion value to formatted string
- `animate()` - Animates from 0 to `num` over 1.2 seconds
- **No re-renders** during animation (motion value updates don't trigger React renders)

### Pattern 4: Conditional Animations

```typescript
const { ref, inView } = useInView({ once: true, amount: 0.3 })
const [hovered, setHovered] = useState(false)
const active = inView || hovered

useEffect(() => {
  if (!active) return

  // Start animation when either in view OR hovered
  const interval = setInterval(() => {
    setBits(prev => randomizeBits(prev))
  }, 200)

  return () => clearInterval(interval)
}, [active])
```

### Animation Best Practices

1. **Always use `viewport={{ once: true }}`** - Prevents re-triggering animations on scroll up
2. **Use `amount` threshold** - `amount: 0.3` means "trigger when 30% of element is visible"
3. **Cleanup effects** - Always return cleanup function from `useEffect`
4. **Prefer motion values for numbers** - Avoids expensive re-renders during animation
5. **Stagger delays** - Multiply index by 0.05 for 50ms stagger

### Common Animation Durations

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Fade in | 0.6s | Default |
| Slide in | 0.5s | Default |
| Number count-up | 1.2s | `easeOut` |
| Button hover | 0.2s | Default |
| Card hover | 0.3s | Default |

---

## Key Utilities

### Mathematical Functions (`lib/math.ts`)

#### Constants

```typescript
export const TWO = new Decimal(2)
export const BITS_TOTAL = new Decimal(128)
export const BITS_RANDOM_V4 = new Decimal(122)  // 6 bits fixed by v4 spec
export const SPACE_128 = TWO.pow(BITS_TOTAL)    // 2^128 ≈ 3.4 × 10^38
export const SPACE_122 = TWO.pow(BITS_RANDOM_V4) // 2^122 ≈ 5.3 × 10^36
```

**Why two spaces?**
- `SPACE_128` - Theoretical GUID space (all 128 bits random)
- `SPACE_122` - Actual v4 GUID space (6 bits reserved for version + variant)

#### Core Calculations

**Birthday Paradox Probability**:
```typescript
export function collisionProbability(n: Num, space: Num = SPACE_122): Decimal
```
Formula: `p ≈ 1 − exp(−n(n−1) / (2·space))`

**Expected Collision Pairs**:
```typescript
export function expectedPairs(n: Num, space: Num = SPACE_122): Decimal
```
Formula: `λ = n(n−1) / (2·space)` (Poisson parameter)

**Witness Probability**:
```typescript
export function witnessProbability(
  n: Num,
  exposureFraction: Num,
  recognition: Num,
  space: Num = SPACE_122
): Decimal
```
Formula: `λ_seen = λ · e² · d`, where:
- `e` = exposure fraction (what % of GUIDs you see)
- `d` = recognition probability (do you notice the collision?)

**Years to Exhaust Space**:
```typescript
export function yearsToExhaust(ratePerSecond: Num, space: Num = SPACE_122): Decimal
```
Formula: `space / ratePerSecond / (60 × 60 × 24 × 365)`

#### Formatting Functions

**Scientific Notation**:
```typescript
export function scientificParts(d: Decimal): { coeff: string, exp: number }
// Example: 3.4e38 → { coeff: "3.40", exp: 38 }
```

**Speakable Numbers**:
```typescript
export function speakable(d: Decimal): string
// Example: 3.4e38 → "about 3.40 undecillion"

export function speakableWithName(d: Decimal): string
// Example: 5.3e36 → "about 5.30 undecillion"
```

**Pretty Integers**:
```typescript
export function prettyInt(d: Decimal): string
// Example: 1000000 → "1 000 000"
```

**Big Number Formatting**:
```typescript
export function formatBig(d: Decimal, dp = 2): string
// Uses scientific notation for numbers > 1e6 or < 1e-3
```

#### Flexible Number Parsing

```typescript
export function parseFlexibleNumber(s: string): Decimal
// Accepts: "1,000,000", "1_000_000", "1e6", "1000000"
// Returns: Decimal(1000000)
```

**Sanitization pattern used throughout**:
```typescript
const sanitize = (s: string) => s.replace(/[,_\s]/g, '')
```

### GUID Generation

**Secure v4 GUID generation** (used in `Generator.tsx`):

```typescript
function uuidv4(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)  // Cryptographically secure random

  // Set version bits (4)
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40

  // Set variant bits (10)
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80

  // Convert to hex and format
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'))
  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-')
}
```

**Important**: Uses `crypto.getRandomValues()` for cryptographic quality randomness.

### Throttling Utility

```typescript
const throttle = (fn: () => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return () => {
    if (timeout === null) {
      fn()
      timeout = setTimeout(() => { timeout = null }, wait)
    }
  }
}

// Usage
const throttledScroll = throttle(handleScroll, 100)
window.addEventListener('scroll', throttledScroll)
```

---

## Common Tasks

### Adding a New Section

1. **Create component file** in `src/components/`:
   ```typescript
   // src/components/NewSection.tsx
   import { motion } from 'framer-motion'

   export default function NewSection() {
     return (
       <section className="mx-auto max-w-6xl px-6 py-20">
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-4xl font-bold text-white"
         >
           New Section Title
         </motion.h2>
         {/* Content */}
       </section>
     )
   }
   ```

2. **Import in `App.tsx`**:
   ```typescript
   import NewSection from './components/NewSection'
   ```

3. **Add to render tree** in `App.tsx`:
   ```typescript
   export default function App() {
     return (
       <div className="relative min-h-screen bg-grid bg-[length:24px_24px]">
         <ParallaxStars />
         <Header />
         <main>
           {/* ... existing sections ... */}
           <NewSection />  {/* Add here */}
           <Sources />
         </main>
       </div>
     )
   }
   ```

### Adding a New Utility Function

1. **Add to `lib/math.ts`**:
   ```typescript
   export function newCalculation(input: Num): Decimal {
     const n = new Decimal(input)
     // Calculation logic
     return result
   }
   ```

2. **Import in component**:
   ```typescript
   import { newCalculation } from '../lib/math'
   ```

### Adding a New Icon

**Using Lucide React**:

1. **Find icon** at https://lucide.dev/icons/
2. **Import in component**:
   ```typescript
   import { IconName } from 'lucide-react'
   ```
3. **Use in JSX**:
   ```tsx
   <IconName className="h-6 w-6 text-accent" />
   ```

**Common icons used**:
- `Calculator` - Calculators
- `Eye`, `User`, `Cog` - Layers explainer
- `Github` - GitHub link
- `Copy`, `Check` - Clipboard actions

### Testing Locally

```bash
# Start dev server
npm run dev

# In browser: http://localhost:5173

# Test responsive design:
# - Resize browser window
# - Use Chrome DevTools mobile emulation
# - Test on actual mobile device (use local IP)

# Test animations:
# - Scroll through page
# - Hover over interactive elements
# - Test in-view triggers
```

### Debugging Tips

**React DevTools**:
```bash
# Install React DevTools browser extension
# View component tree, props, state, hooks
```

**Decimal.js debugging**:
```typescript
// Log Decimal as number
console.log(decimalValue.toNumber())

// Log as string with precision
console.log(decimalValue.toFixed(10))

// Log as exponential
console.log(decimalValue.toExponential())
```

**Framer Motion debugging**:
```tsx
// Add visual debugging
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  onViewportEnter={() => console.log('Entered viewport')}
  onViewportLeave={() => console.log('Left viewport')}
>
```

### Building for Production

```bash
# Type-check and build
npm run build

# Preview production build locally
npm run preview

# Check build output
ls -lh dist/
```

**Build output location**: `/dist`

**Typical build size**:
- HTML: ~2 KB
- JS (main): ~200-300 KB (minified + gzipped)
- CSS: ~5-10 KB

---

## Git Workflow

### Branching Strategy

**Main branches**:
- `main` (or default branch) - Production-ready code
- `claude/*` - Feature branches created by AI assistants

**Branch naming convention for AI assistants**:
```
claude/descriptive-feature-name-{sessionId}
```

Example: `claude/add-mobile-nav-ukVwn`

### Commit Message Style

**Format**: Conventional Commits

```
<type>: <description>

[optional body]
```

**Types**:
- `feat` - New feature (e.g., "feat: add mobile navigation")
- `fix` - Bug fix (e.g., "fix: correct collision probability formula")
- `docs` - Documentation (e.g., "docs: update README with new features")
- `style` - Code style changes (e.g., "style: format with Prettier")
- `refactor` - Code refactoring (e.g., "refactor: extract math utilities")
- `test` - Tests (e.g., "test: add unit tests for math functions")
- `chore` - Build/tooling (e.g., "chore: update dependencies")

**Examples**:
```bash
git commit -m "feat: add copy-to-clipboard for individual GUIDs"
git commit -m "fix: improve mobile navigation layout"
git commit -m "docs: create comprehensive CLAUDE.md guide"
```

### Pre-Commit Checklist

Before committing:

1. ✅ **Format code**: `npm run format`
2. ✅ **Type-check**: `npm run build` (includes TypeScript check)
3. ✅ **Test locally**: `npm run dev` and manually verify changes
4. ✅ **Review diff**: `git diff` to ensure no unintended changes
5. ✅ **Stage relevant files**: `git add <files>`
6. ✅ **Write clear commit message**

### Push and PR Process

**Push to branch**:
```bash
git push -u origin claude/feature-name-{sessionId}
```

**Create Pull Request**:
```bash
# Using GitHub CLI
gh pr create --title "Add feature X" --body "$(cat <<'EOF'
## Summary
- Added feature X
- Updated documentation

## Test plan
- [ ] Tested locally with `npm run dev`
- [ ] Verified mobile responsiveness
- [ ] Checked all animations work correctly
EOF
)"
```

**PR Template**:
```markdown
## Summary
- Brief bullet points of changes

## Test plan
- [ ] Tested locally
- [ ] Verified responsive design
- [ ] Checked browser compatibility
- [ ] Animations work correctly
```

### Common Git Commands

```bash
# Check current status
git status

# View recent commits
git log --oneline -10

# View diff of unstaged changes
git diff

# View diff of staged changes
git diff --cached

# Stage all changes
git add .

# Stage specific file
git add src/components/NewComponent.tsx

# Commit with message
git commit -m "feat: add new component"

# Push to remote
git push -u origin branch-name

# Pull latest changes
git pull origin branch-name

# Create new branch
git checkout -b claude/new-feature-ukVwn
```

---

## Additional Notes

### Performance Considerations

1. **Decimal.js operations are expensive** - Use `useMemo` for calculations:
   ```typescript
   const result = useMemo(() => {
     return expensiveCalculation(input)
   }, [input])
   ```

2. **Scroll events are frequent** - Always throttle scroll listeners:
   ```typescript
   const throttledScroll = throttle(handleScroll, 100)
   ```

3. **Canvas operations are synchronous** - Use `requestAnimationFrame` for animations:
   ```typescript
   const render = () => {
     ctx.clearRect(0, 0, width, height)
     // Draw
     raf = requestAnimationFrame(render)
   }
   ```

4. **Motion values avoid re-renders** - Prefer `useMotionValue` for animating numbers

### Browser Compatibility

**Minimum browser versions**:
- Chrome 90+
- Firefox 88+
- Safari 15.4+
- Edge 90+

**Required APIs**:
- Web Crypto API (`crypto.getRandomValues`)
- Canvas API
- Clipboard API (`navigator.clipboard`)
- Intersection Observer (via Framer Motion)
- CSS `backdrop-filter` (for glassmorphism)

### Mobile Considerations

**Touch-friendly targets**:
- Minimum button size: 44×44px (iOS guideline)
- Padding on interactive elements: `px-6 py-3` or larger

**Responsive breakpoints**:
```tsx
// Mobile-first approach
<div className="
  grid-cols-1          /* Mobile: 1 column */
  md:grid-cols-2       /* Tablet: 2 columns */
  lg:grid-cols-4       /* Desktop: 4 columns */
">
```

**Mobile testing**:
```bash
# Find local IP
ifconfig | grep inet

# Access from mobile device:
# http://192.168.x.x:5173
```

### Security Considerations

**GUID Generation**:
- ✅ Uses `crypto.getRandomValues()` (cryptographically secure)
- ❌ DO NOT use `Math.random()` for GUID generation

**Input Validation**:
- Always validate and sanitize user input
- Use try-catch for Decimal parsing
- Check for `Number.isFinite()` before arithmetic

**Dependencies**:
- Keep dependencies updated: `npm audit`
- Review security advisories: `npm audit fix`

---

## Key Files Quick Reference

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/App.tsx` | Main component orchestration | Adding/removing sections |
| `src/lib/math.ts` | Mathematical utilities | Adding calculations |
| `src/index.css` | Global styles | Adding custom CSS |
| `tailwind.config.js` | Tailwind theme | Adding colors/utilities |
| `vite.config.ts` | Build configuration | Changing build settings |
| `package.json` | Dependencies and scripts | Adding packages |
| `.prettierrc` | Code formatting rules | Changing format style |

---

## Questions & Support

**For AI Assistants**:
- This document should provide everything needed to work on this project
- When in doubt, refer to existing component patterns in `src/components/`
- Follow the established conventions strictly
- Always format code with Prettier before committing

**For Humans**:
- Issues: https://github.com/wbratz/HowUniqueIsAGuid/issues
- Pull Requests: Follow the PR template above
- Questions: Open a GitHub Discussion

---

**Last Updated**: 2026-01-20
**Document Version**: 1.0.0
**Maintained By**: AI Assistants & Project Contributors
