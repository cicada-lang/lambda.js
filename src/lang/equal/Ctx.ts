import { same } from "../same/index.ts"
import { type Value } from "../value/index.ts"

export type Blaze = {
  lhs: Value
  rhs: Value
}

export type Ctx = {
  boundNames: Set<string>
  trail: Array<Blaze>
  depth: number
}

export function emptyCtx(): Ctx {
  return {
    boundNames: new Set(),
    trail: new Array(),
    depth: 0,
  }
}

export function ctxDepthAdd1(ctx: Ctx): Ctx {
  return {
    ...ctx,
    depth: ctx.depth + 1,
  }
}

export function ctxBindName(ctx: Ctx, name: string): Ctx {
  return {
    ...ctx,
    boundNames: new Set([...ctx.boundNames, name]),
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
