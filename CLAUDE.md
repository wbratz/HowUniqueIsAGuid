# CLAUDE.md — AI Assistant Guide for HowUniqueIsAGuid

**Repository**: https://github.com/wbratz/HowUniqueIsAGuid
**Purpose**: A visually stunning, "wow factor" experience that showcases the beauty and uniqueness of GUIDs to non-engineers through breathtaking visualizations and interactive storytelling
**Last Updated**: 2026-01-20

---

## 🎯 Core Mission: Visual Beauty First

**This website exists to create AWE and WONDER about GUIDs.**

The primary goal is NOT to educate engineers—it's to make non-technical people say "WOW" and truly *feel* how mind-bogglingly unique GUIDs are. Every design decision, animation, and interaction should prioritize:

1. **Visual Impact** - Stunning, memorable, share-worthy aesthetics
2. **Emotional Connection** - Make abstract numbers feel real and awe-inspiring
3. **Accessibility to Non-Engineers** - No jargon, relatable comparisons, "speakable" numbers
4. **Delight** - Smooth animations, satisfying interactions, beautiful transitions

**When making ANY change, ask**: *"Does this increase the wow factor? Will non-engineers find this beautiful?"*

---

## Table of Contents

1. [Core Mission & Design Philosophy](#core-mission--design-philosophy)
2. [Project Overview](#project-overview)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [Code Conventions](#code-conventions)
7. [Component Architecture](#component-architecture)
8. [Styling Guidelines](#styling-guidelines)
9. [TypeScript Conventions](#typescript-conventions)
10. [Animation Patterns](#animation-patterns)
11. [Key Utilities](#key-utilities)
12. [Common Tasks](#common-tasks)
13. [Git Workflow](#git-workflow)

---

## Core Mission & Design Philosophy

### The Why: Showcasing Beauty, Not Just Facts

GUIDs are objectively incredible—2^122 possible combinations is a number so large it defies human comprehension. But most people glaze over when they see "5.3 × 10^36". **This website exists to make that incomprehensibility BEAUTIFUL.**

### Design Principles (In Order of Priority)

1. **🌟 Wow Factor Above All**
   - Every section should elicit an emotional response
   - Prioritize visual beauty over technical completeness
   - If a feature doesn't make someone go "whoa", reconsider it

2. **💫 Animations Tell the Story**
   - Numbers counting up create anticipation
   - Staggered reveals maintain engagement
   - Scroll-triggered effects create a sense of journey
   - Smooth, polished motion (nothing janky or stuttering)

3. **🎨 Glassmorphism & Depth**
   - Frosted glass cards feel premium and modern
   - Parallax stars create immersion and depth
   - Subtle glows and shadows add dimensionality
   - Dark theme with high contrast for maximum impact

4. **🗣️ Speak Human, Not Engineer**
   - "About 5 undecillion" > "5.3 × 10^36"
   - "Winning the lottery 5 times in a row" > "1 in 2.8 × 10^35"
   - Show the math for credibility, but lead with wonder

5. **📱 Universal Accessibility**
   - Non-engineers are the PRIMARY audience
   - Engineers are secondary (they'll appreciate the accuracy)
   - Mobile-first: Most shares happen on phones
   - Touch-friendly, thumb-reachable interactions

### What This Means for Development

**✅ DO**:
- Add delightful micro-animations (hover states, transitions)
- Create interactive visualizations that respond to user input
- Use analogies everyone understands (sand, atoms, lottery tickets)
- Make numbers "count up" dramatically with easing curves
- Add visual feedback for every interaction (clicks, hovers, copies)
- Optimize for sharing (beautiful on social media previews)

**❌ DON'T**:
- Add features that require technical knowledge to understand
- Use jargon without explaining it in human terms
- Prioritize performance optimizations over visual polish (unless it's janky)
- Create walls of text—keep it scannable and visual
- Assume users care about mathematical precision (show it, but don't lead with it)

### The Litmus Test for Changes

Before implementing any feature, ask:

1. **"Would my non-technical friend think this is beautiful?"**
2. **"Does this make the number feel MORE mind-blowing?"**
3. **"Will someone screenshot this and share it?"**

If the answer to any is "no", reconsider the approach.

### Examples of the Philosophy in Action

**Example 1: Number Formatting**
- ❌ Engineer: "2^122 = 5.316911983 × 10^36"
- ✅ This Site: "About **5 undecillion**" (with small "2^122 ≈ 5.3 × 10^36" below)

**Example 2: Probability Calculator**
- ❌ Engineer: "P(collision) = 1 - exp(-n(n-1)/2S)"
- ✅ This Site: Interactive input → "0.000001% chance" → "That's like rolling 5 specific dice numbers in a row"

**Example 3: Visual Hierarchy**
- ❌ Engineer: Dense paragraph explaining birthday paradox
- ✅ This Site: Animated counting numbers → Fade-in analogy → Expandable "show math" section

### Tone & Voice

**Conversational, Wonder-Filled, Confident**

- "GUIDs are *absurdly* unique" (not "GUIDs have low collision probability")
- "You'd need to generate a billion GUIDs *every second* for 168 billion years" (not "exhaustion time is 1.68 × 10^11 years")
- "Let's put that in perspective..." (not "To demonstrate this mathematically...")

**Hierarchy of Communication**:
1. **Emotional hook** (the "wow")
2. **Relatable analogy** (make it tangible)
3. **The number** (satisfy curiosity)
4. **The math** (build credibility for engineers)

---

---

## Project Overview

### What This Project Does

This is a **visually breathtaking experience** that makes GUID uniqueness feel REAL through:

**"Wow Factor" Features**:
- 🌌 **Parallax starfield** - Immersive depth that mirrors the vastness of GUID space
- ✨ **Animated bit grid** - Watch GUIDs come to life with randomizing bits
- 🎲 **Interactive calculators** - Type numbers, watch probabilities animate dramatically
- 🌍 **Mind-blowing comparisons** - "More combinations than atoms in 10 billion Earths"
- 🎰 **Relatable odds** - "Easier to win the lottery 5 times in a row"
- 🔮 **Witness calculator** - "What's the chance YOU see a collision in your lifetime?"
- 🎨 **Glassmorphism cards** - Premium, frosted-glass aesthetic
- 🌊 **Scroll-triggered animations** - Each section reveals with cinematic timing
- 📋 **One-click GUID generator** - Satisfying copy-to-clipboard with visual feedback

**Target Audience (In Priority Order)**:
1. **Primary**: Non-engineers who love beautiful, mind-blowing internet experiences
2. **Secondary**: Developers who want to share GUID uniqueness with non-technical stakeholders
3. **Tertiary**: Engineers who appreciate both visual polish AND mathematical rigor

**Design Philosophy**:
- **Beauty > Technical Completeness** - If it's not stunning, it doesn't ship
- **Feel > Facts** - Make users FEEL the incomprehensibility before showing the math
- **Delight > Efficiency** - A 1.2s count-up animation is BETTER than instant (it builds anticipation)
- **Analogies > Notation** - "5 undecillion" communicates better than "5.3 × 10^36"
- **Share-Worthy** - Every section should be screenshot-able and post-able

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

### 🎨 Styling Mission: Create Visual Wonder

**Styling is not about organizing CSS—it's about creating AWE.**

Every color, shadow, blur, and transition exists to make users feel like they're experiencing something special. This is a premium, polished, "I want to share this" experience.

**Visual Hierarchy**:
1. **Glassmorphism** - Frosted glass cards that feel tactile and premium
2. **Depth & Parallax** - Layered elements that create immersion
3. **Subtle Glows** - Purple accent glows that draw attention without overwhelming
4. **Smooth Transitions** - Every interaction should feel buttery smooth
5. **High Contrast** - Dark theme with crisp white text for maximum readability

**Style Philosophy**:
- **Delight over minimalism** - It's okay to be visually rich if it enhances the experience
- **Polished over plain** - Invest in micro-interactions and hover states
- **Consistent over varied** - Maintain the glassmorphism aesthetic throughout
- **Accessible over trendy** - Beauty means nothing if people can't use it

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

### 🎬 Animations Mission: Tell the Story Through Motion

**Animations are not decoration—they're the STORYTELLING mechanism.**

Every fade, slide, and count-up serves a purpose:
- **Build anticipation** - Numbers counting up create "I wonder how high it'll go"
- **Guide attention** - Staggered reveals show users where to look next
- **Create rhythm** - Scroll-triggered effects make the page feel alive
- **Enhance comprehension** - Transitions help users understand relationships
- **Delight users** - Smooth, polished motion feels premium

**Animation Philosophy**:
- **Purposeful, not gratuitous** - Every animation should enhance understanding or create delight
- **Smooth, never janky** - 60fps or bust (use motion values for heavy animations)
- **Timed for emotion** - 1.2s count-up feels more dramatic than 0.3s instant reveal
- **Progressive disclosure** - Reveal information as users scroll (journey, not wall)
- **Mobile-friendly** - Animations should work beautifully on all devices

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

### ⭐ Evaluating Any Change Through the "Wow Factor" Lens

**Before implementing ANY feature, enhancement, or change, run through this checklist:**

#### The "Wow Factor" Checklist

1. **Visual Beauty Test**
   - Does this look MORE stunning than before?
   - Would someone screenshot and share this?
   - Does it maintain the premium, glassmorphic aesthetic?

2. **Non-Engineer Test**
   - Can my non-technical friend understand this instantly?
   - Does it use jargon or require domain knowledge?
   - Is the benefit immediately obvious?

3. **Emotional Impact Test**
   - Does this make the numbers feel MORE mind-blowing?
   - Does it create wonder, awe, or surprise?
   - Does it help visualize the abstract?

4. **Interaction Delight Test**
   - Is there satisfying feedback for user actions? (hover states, transitions, confirmations)
   - Do animations feel smooth and purposeful?
   - Is the interaction intuitive without instructions?

5. **Mobile Experience Test**
   - Does this work beautifully on a phone?
   - Are touch targets large enough?
   - Does it maintain visual impact on small screens?

#### Decision Framework

| Scenario | Priority | Example |
|----------|----------|---------|
| **Visual enhancement** | ✅ HIGH | Adding particle effects, smoother animations, better hover states |
| **Accessibility improvement** | ✅ HIGH | Better contrast, ARIA labels, keyboard navigation |
| **Performance (if janky)** | ✅ HIGH | Stuttering animations, slow load times |
| **New "wow" feature** | ✅ MEDIUM | Interactive 3D GUID visualization, sound effects |
| **Technical accuracy** | ⚠️ MEDIUM | Fixing math formulas (if incorrect), but present beautifully |
| **Code refactoring** | ⚠️ LOW | Only if it enables future visual enhancements |
| **Performance (if smooth)** | ⚠️ LOW | Micro-optimizations when experience is already smooth |
| **Engineer-only features** | ❌ DEPRIORITIZE | Dense technical explanations without visual counterpart |

#### Examples of Good vs. Bad Changes

**✅ GOOD Changes (Aligned with Mission)**:
- Add glow effect to GUID generator button on hover
- Animate numbers counting up with easing curve
- Create parallax effect on scroll for section headers
- Add confetti animation when copying a GUID
- Replace scientific notation with "speakable" format in headlines
- Add analogies: "That's like every person on Earth generating 1 billion GUIDs per second"
- Improve mobile layout so cards stack beautifully

**❌ BAD Changes (Misaligned with Mission)**:
- Add detailed technical explanation of UUID RFC 4122 specification
- Replace "about 5 undecillion" with precise "5.316911983 × 10^36"
- Remove animations to improve performance (if already smooth)
- Add complex filtering/sorting controls for code samples
- Create dense comparison tables without visual hierarchy
- Add features that require understanding of probability theory

**🤔 MAYBE Changes (Require Judgment)**:
- Add "show more math" expandable sections → **✅ YES** if hidden by default, **❌ NO** if it clutters the main view
- Optimize bundle size from 300KB to 250KB → **⚠️ LOW PRIORITY** unless it affects load time perception
- Add loading states → **✅ YES** if animated and beautiful, **❌ NO** if just a spinner
- Add more code language examples → **✅ YES** if presented beautifully, **❌ NO** if it creates a wall of code

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

## 🎯 Design Trade-offs & Priorities

### When Visual Beauty Trumps Other Concerns

This project makes deliberate trade-offs in favor of the "wow factor". Here's when to prioritize beauty over traditional engineering concerns:

#### Visual Beauty > Performance (within reason)

**✅ Acceptable Trade-offs**:
- 1.2s number count-up animation instead of instant display (builds anticipation)
- 300KB bundle size with Framer Motion instead of 150KB with vanilla JS (smooth animations)
- Multiple parallax layers instead of static background (creates depth)
- Backdrop blur on every card (premium aesthetic) even if slightly slower on old devices

**❌ Unacceptable Trade-offs**:
- Animations that stutter or drop frames (janky = unprofessional)
- Load times > 3s on modern devices (users will bounce)
- Memory leaks that crash tabs (broken = not beautiful)
- Blocking the main thread for seconds (frozen UI kills immersion)

**Rule of Thumb**: If it's smooth and loads fast, visual richness wins. If it's janky or slow, optimize.

#### Visual Clarity > Technical Precision (in presentation)

**✅ Good Choices**:
- Headline: "About 5 undecillion" → Small text below: "2^122 ≈ 5.3 × 10^36"
- Say: "More GUIDs than atoms in the universe" → Expandable: "Show calculation"
- Input accepts: "1000000", "1,000,000", "1_000_000", "1e6" (user-friendly)

**❌ Bad Choices**:
- Leading with notation: "5.316911983 × 10^36" without context
- Assuming users know what "birthday paradox" means without explanation
- Showing only the formula without a relatable analogy

**Rule of Thumb**: Lead with wonder, follow with precision. Non-engineers see the "wow", engineers can dig into the math.

#### Animation Duration > Instant Feedback (for dramatic moments)

**✅ When to Add Delay**:
- Number count-ups (1.2s with easing) - builds anticipation
- Section reveals on scroll (0.6s fade) - creates rhythm
- Staggered card animations (50ms delay per card) - directs attention
- Button state transitions (200-300ms) - feels polished

**❌ When NOT to Add Delay**:
- Clipboard copy feedback (instant + 1.5s checkmark) - users expect speed
- Input validation (instant) - delays feel broken
- Hover states (100-200ms max) - longer feels sluggish
- Error messages (instant) - delays hide problems

**Rule of Thumb**: Dramatic reveals get time to breathe. Functional feedback should feel instant.

#### Mobile Experience = Desktop Experience

**Non-Negotiable**:
- Every animation must work beautifully on mobile
- Touch targets must be thumb-friendly (44×44px minimum)
- Parallax effects should not cause scroll jank
- Text must be readable without zooming
- Cards must stack gracefully on small screens

**Why**: Most social shares happen on mobile. If it's not mobile-perfect, it won't go viral.

### Common Design Questions & Answers

**Q: Should I add this cool effect I saw on another site?**
A: Ask: "Does it enhance the GUID uniqueness story?" If yes, prototype it. If it's just decoration, skip it.

**Q: User requested a table of all UUID versions and their specifications.**
A: That's engineer-focused content. Counter-offer: "Would a visual comparison showing v4's randomness be better?" Keep it visual.

**Q: Should I optimize away Framer Motion to reduce bundle size?**
A: Only if the site is slow. Smooth animations ARE the product. Don't optimize away the core value.

**Q: Can I add a dark/light theme toggle?**
A: The dark theme IS the aesthetic. Light mode would dilute the brand. (But ensure sufficient contrast for accessibility.)

**Q: Should numbers update in real-time as users type?**
A: YES! Instant feedback with debouncing (100-200ms) creates delight. Watch the magic happen as you type.

**Q: Is it okay to have a 3-second intro animation?**
A: No. Users should see value in < 1 second. Intro animations gate content and increase bounce rate.

### The Ultimate Litmus Test

**Before shipping any change, ask yourself:**

1. **Would I share this on Twitter/LinkedIn?** (visual beauty)
2. **Would my mom understand it?** (accessibility to non-engineers)
3. **Does it make me go "whoa" when I scroll through?** (emotional impact)
4. **Is it smooth on my phone?** (mobile experience)
5. **Does it make GUIDs seem MORE incredible?** (mission alignment)

If you can't answer "yes" to at least 4/5, reconsider the change.

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

**Remember**: Performance optimization serves the visual experience, not the other way around.

**Priority**: Smooth animations > Small bundle size

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
