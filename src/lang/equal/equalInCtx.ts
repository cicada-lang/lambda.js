import { freshen } from "../../utils/name/freshen.ts"
import { applyWithDelay } from "../evaluate/index.ts"
import { formatValue } from "../format/index.ts"
import { same } from "../same/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { lambdaIsDefined, type Neutral, type Value } from "../value/index.ts"
import {
  ctxBindName,
  ctxBlazeOccurred,
  ctxBlazeTrail,
  ctxDepthAdd1,
  type Ctx,
} from "./Ctx.ts"

const debug = false

export function equalInCtx(ctx: Ctx, lhs: Value, rhs: Value): boolean {
  ctx = ctxDepthAdd1(ctx)

  lhs = Values.lazyActiveDeep(lhs)
  rhs = Values.lazyActiveDeep(rhs)

  if (debug) {
    console.log("[equalInCtx]", ctx.depth, " ", formatValue(lhs))
    console.log("[equalInCtx]", ctx.depth, "=", formatValue(rhs))
    console.log("[equalInCtx]", "same:", same(lhs, rhs))
  }

  if (same(lhs, rhs)) return true

  if (lhs.kind === "NotYet" && rhs.kind === "NotYet") {
    return equalNeutralInCtx(ctx, lhs.neutral, rhs.neutral)
  }

  if (lhs.kind === "Lambda") {
    if (lambdaIsDefined(lhs)) {
      if (ctxBlazeOccurred(ctx, lhs, rhs)) {
        return true
      } else {
        ctx = ctxBlazeTrail(ctx, lhs, rhs)
      }
    }

    const freshName = freshen(ctx.boundNames, lhs.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.Var(freshName)
    const arg = Values.NotYet(v)
    return equalInCtx(ctx, applyWithDelay(lhs, arg), applyWithDelay(rhs, arg))
  }

  if (rhs.kind === "Lambda") {
    if (lambdaIsDefined(rhs)) {
      if (ctxBlazeOccurred(ctx, rhs, lhs)) {
        return true
      } else {
        ctx = ctxBlazeTrail(ctx, rhs, lhs)
      }
    }

    const freshName = freshen(ctx.boundNames, rhs.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.Var(freshName)
    const arg = Values.NotYet(v)
    return equalInCtx(ctx, applyWithDelay(lhs, arg), applyWithDelay(rhs, arg))
  }

  if (lhs.kind === "DelayedApply" && rhs.kind === "DelayedApply") {
    if (
      equalInCtx(ctx, lhs.target, rhs.target) &&
      equalInCtx(ctx, lhs.arg, rhs.arg)
    ) {
      return true
    }

    // if (
    //   equalInCtx(ctx, applyWithDelay(left.target, left.arg), right) ||
    //   equalInCtx(ctx, left, applyWithDelay(right.target, right.arg)) ||
    //   equalInCtx(
    //     ctx,
    //     applyWithDelay(left.target, left.arg),
    //     applyWithDelay(right.target, right.arg),
    //   )
    // ) {
    //   return true
    // }
  }

  if (lhs.kind === "DelayedApply") {
    return equalInCtx(ctx, applyWithDelay(lhs.target, lhs.arg), rhs)
  }

  if (rhs.kind === "DelayedApply") {
    return equalInCtx(ctx, lhs, applyWithDelay(rhs.target, rhs.arg))
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
