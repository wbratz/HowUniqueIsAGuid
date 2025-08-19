# GUID Uniqueness — modern SPA (dark)

A production-ready, single-page React app (Vite + TypeScript + Tailwind + framer-motion) that answers:
**How unique is a GUID?**

Repo: https://github.com/wbratz/HowUniqueIsAGuid

## Highlights
- Speakable numbers ("about 340 undecillion") with small math lines for engineers (e.g., 2^128 ≈ 3.40 × 10^38).
- Birthday paradox calculator (accepts 50,000 / 1e9 / 5_000_000).
- Relatable odds (lottery streaks, dice sequences, random code lengths).
- "Witness" calculator: probability you personally encounter *and notice* a collision.
- Secure v4 GUID generator.

## Run locally
> Node 18+ required (Vite 5)
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
npm run preview
```
