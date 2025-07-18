import { freshen } from "../../utils/freshen.ts"
import { apply } from "../evaluate/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Neutral, type Value } from "../value/index.ts"

export function equivalentInCtx(ctx: Ctx, left: Value, right: Value): boolean {
  left = Values.lazyActiveDeep(left)
  right = Values.lazyActiveDeep(right)

  if (left.kind === "NotYet" && right.kind === "NotYet") {
    return equivalentNeutralInCtx(ctx, left.neutral, right.neutral)
  }

  if (left.kind === "Lambda" && right.kind === "Lambda") {
    const freshName = freshen(ctx.usedNames, left.name)
    ctx = ctxUseName(ctx, freshName)
    const v = Neutrals.Var(freshName)
    const arg = Values.NotYet(v)
    return equivalentInCtx(ctx, apply(left, arg), apply(right, arg))
  }

  return false
}

function equivalentNeutralInCtx(
  ctx: Ctx,
  left: Neutral,
  right: Neutral,
): boolean {
  if (left.kind === "Var" && right.kind === "Var") {
    return right.name === left.name
  }

  if (left.kind === "Apply" && right.kind === "Apply") {
    return (
      equivalentNeutralInCtx(ctx, left.target, right.target) &&
      equivalentInCtx(ctx, left.arg, right.arg)
    )
  }

  return false
}

type Ctx = {
  usedNames: Set<string>
}

export function emptyEquivalentCtx(): Ctx {
  return {
    usedNames: new Set(),
  }
}

function ctxUseName(ctx: Ctx, name: string): Ctx {
  return {
    ...ctx,
    usedNames: new Set([...ctx.usedNames, name]),
  }
}
