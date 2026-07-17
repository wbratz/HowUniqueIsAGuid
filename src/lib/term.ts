// App-facing terminology binding. Components import `TERM` from here.
//
// The variant is resolved from the build-time env var VITE_VARIANT (defaults to
// GUID when unset, e.g. during `npm run dev`). See ./term-config for the vocab.
import { buildTerm, resolveVariant } from './term-config'

export type { Variant } from './term-config'

export const TERM = buildTerm(resolveVariant(import.meta.env.VITE_VARIANT))
