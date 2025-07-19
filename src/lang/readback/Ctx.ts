import { same } from "../same/index.ts"
import { type Value } from "../value/index.ts"

export type Blaze = {
  value: Value
}

export type Ctx = {
  usedNames: Set<string>
  trail: Array<Blaze>
}

export function emptyCtx(): Ctx {
  return {
    usedNames: new Set(),
    trail: new Array(),
  }
}

export function ctxUseName(ctx: Ctx, name: string): Ctx {
  return {
    ...ctx,
    usedNames: new Set([...ctx.usedNames, name]),
  }
}

export function ctxBlazeTrail(ctx: Ctx, value: Value): Ctx {
  return {
    ...ctx,
    trail: [...ctx.trail, { value }],
  }
}

export function ctxBlazeOccurred(ctx: Ctx, value: Value): boolean {
  for (const blaze of ctx.trail) {
    if (same(value, blaze.value)) {
      return true
    }
  }

  return false
}
