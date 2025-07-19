import { freshen } from "../../utils/name/freshen.ts"
import { applyOneStep } from "../evaluate/index.ts"
import { same } from "../same/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { lambdaIsDefined, type Neutral, type Value } from "../value/index.ts"
import { ctxBlaseOccurred, ctxBlaseTrail, ctxUseName, type Ctx } from "./Ctx.ts"

export function equalInCtx(ctx: Ctx, left: Value, right: Value): boolean {
  if (same(left, right)) return true

  left = Values.lazyActiveDeep(left)
  right = Values.lazyActiveDeep(right)

  if (left.kind === "NotYet" && right.kind === "NotYet") {
    return equalNeutralInCtx(ctx, left.neutral, right.neutral)
  }

  if (left.kind === "Lambda") {
    if (lambdaIsDefined(left)) {
      if (ctxBlaseOccurred(ctx, left, right)) {
        return true
      } else {
        ctx = ctxBlaseTrail(ctx, left, right)
      }
    }

    const freshName = freshen(ctx.usedNames, left.name)
    ctx = ctxUseName(ctx, freshName)
    const v = Neutrals.Var(freshName)
    const arg = Values.NotYet(v)
    return equalInCtx(ctx, applyOneStep(left, arg), applyOneStep(right, arg))
  }

  if (right.kind === "Lambda") {
    if (lambdaIsDefined(right)) {
      if (ctxBlaseOccurred(ctx, right, left)) {
        return true
      } else {
        ctx = ctxBlaseTrail(ctx, right, left)
      }
    }

    const freshName = freshen(ctx.usedNames, right.name)
    ctx = ctxUseName(ctx, freshName)
    const v = Neutrals.Var(freshName)
    const arg = Values.NotYet(v)
    return equalInCtx(ctx, applyOneStep(left, arg), applyOneStep(right, arg))
  }

  if (left.kind === "DelayedApply" && right.kind === "DelayedApply") {
    if (
      equalInCtx(ctx, left.target, right.target) &&
      equalInCtx(ctx, left.arg, right.arg)
    ) {
      return true
    }

    if (
      equalInCtx(ctx, applyOneStep(left.target, left.arg), right) ||
      equalInCtx(ctx, left, applyOneStep(right.target, right.arg)) ||
      equalInCtx(
        ctx,
        applyOneStep(left.target, left.arg),
        applyOneStep(right.target, right.arg),
      )
    ) {
      return true
    }
  }

  if (left.kind === "DelayedApply") {
    return equalInCtx(ctx, applyOneStep(left.target, left.arg), right)
  }

  if (right.kind === "DelayedApply") {
    return equalInCtx(ctx, left, applyOneStep(right.target, right.arg))
  }

  return false
}

function equalNeutralInCtx(ctx: Ctx, left: Neutral, right: Neutral): boolean {
  if (left.kind === "Var" && right.kind === "Var") {
    return right.name === left.name
  }

  if (left.kind === "Apply" && right.kind === "Apply") {
    return (
      equalNeutralInCtx(ctx, left.target, right.target) &&
      equalInCtx(ctx, left.arg, right.arg)
    )
  }

  return false
}
