import { same } from "../same/index.ts"
import { type Value } from "../value/index.ts"

export type Blaze = {
  lhs: Value
  rhs: Value
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

export function ctxBlazeTrail(ctx: Ctx, lhs: Value, rhs: Value): Ctx {
  return {
    ...ctx,
    trail: [...ctx.trail, { lhs, rhs }],
  }
}

export function ctxBlazeOccurred(ctx: Ctx, lhs: Value, rhs: Value): boolean {
  for (const blaze of ctx.trail) {
    if (same(lhs, blaze.lhs) && same(rhs, blaze.rhs)) {
      return true
    }
  }

  return false
}
