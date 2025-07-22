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

export function equalInCtx(ctx: Ctx, left: Value, right: Value): boolean {
  ctx = ctxDepthAdd1(ctx)

  if (debug) {
    console.log("[equalInCtx]", ctx.depth, "*", formatValue(left))
    console.log("[equalInCtx]", ctx.depth, "=", formatValue(right))
  }

  if (same(left, right)) return true

  left = Values.lazyActiveDeep(left)
  right = Values.lazyActiveDeep(right)

  if (left.kind === "NotYet" && right.kind === "NotYet") {
    return equalNeutralInCtx(ctx, left.neutral, right.neutral)
  }

  if (left.kind === "Lambda") {
    if (lambdaIsDefined(left)) {
      if (ctxBlazeOccurred(ctx, left, right)) {
        return true
      } else {
        ctx = ctxBlazeTrail(ctx, left, right)
      }
    }

    const freshName = freshen(ctx.boundNames, left.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.Var(freshName)
    const arg = Values.NotYet(v)
    return equalInCtx(
      ctx,
      applyWithDelay(left, arg),
      applyWithDelay(right, arg),
    )
  }

  if (right.kind === "Lambda") {
    if (lambdaIsDefined(right)) {
      if (ctxBlazeOccurred(ctx, right, left)) {
        return true
      } else {
        ctx = ctxBlazeTrail(ctx, right, left)
      }
    }

    const freshName = freshen(ctx.boundNames, right.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.Var(freshName)
    const arg = Values.NotYet(v)
    return equalInCtx(
      ctx,
      applyWithDelay(left, arg),
      applyWithDelay(right, arg),
    )
  }

  if (left.kind === "DelayedApply" && right.kind === "DelayedApply") {
    if (
      equalInCtx(ctx, left.target, right.target) &&
      equalInCtx(ctx, left.arg, right.arg)
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

  if (left.kind === "DelayedApply") {
    return equalInCtx(ctx, applyWithDelay(left.target, left.arg), right)
  }

  if (right.kind === "DelayedApply") {
    return equalInCtx(ctx, left, applyWithDelay(right.target, right.arg))
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
