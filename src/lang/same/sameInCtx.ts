import { freshen } from "../../utils/name/freshen.ts"
import { applyWithDelay } from "../evaluate/index.ts"
import { formatValue } from "../format/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import {
  lambdaIsDefined,
  lambdaSameDefined,
  type Neutral,
  type Value,
} from "../value/index.ts"
import { ctxBindName, ctxDepthAdd1, type Ctx } from "./Ctx.ts"

const debug = false

export function sameInCtx(ctx: Ctx, lhs: Value, rhs: Value): boolean {
  ctx = ctxDepthAdd1(ctx)

  lhs = Values.lazyActiveDeep(lhs)
  rhs = Values.lazyActiveDeep(rhs)

  if (debug) {
    console.log("[sameInCtx]", ctx.depth, " ", formatValue(lhs))
    console.log("[sameInCtx]", ctx.depth, "=", formatValue(rhs))
  }

  if (lhs.kind === "NotYet" && rhs.kind === "NotYet") {
    return sameNeutralInCtx(ctx, lhs.neutral, rhs.neutral)
  }

  if (lhs.kind === "Lambda" && rhs.kind === "Lambda") {
    if (lambdaSameDefined(lhs, rhs)) {
      return true
    }

    if (lambdaIsDefined(lhs) || lambdaIsDefined(rhs)) {
      return false
    }
  }

  if (lhs.kind === "Lambda" && !lambdaIsDefined(lhs)) {
    const freshName = freshen(ctx.boundNames, lhs.name)
    ctx = ctxBindName(ctx, freshName)
    const arg = Values.NotYet(Neutrals.Var(freshName))
    return sameInCtx(ctx, applyWithDelay(lhs, arg), applyWithDelay(rhs, arg))
  }

  if (rhs.kind === "Lambda" && !lambdaIsDefined(rhs)) {
    const freshName = freshen(ctx.boundNames, rhs.name)
    ctx = ctxBindName(ctx, freshName)
    const arg = Values.NotYet(Neutrals.Var(freshName))
    return sameInCtx(ctx, applyWithDelay(lhs, arg), applyWithDelay(rhs, arg))
  }

  if (lhs.kind === "DelayedApply" && rhs.kind === "DelayedApply") {
    if (
      sameInCtx(ctx, lhs.target, rhs.target) &&
      sameInCtx(ctx, lhs.arg, rhs.arg)
    ) {
      return true
    }
  }

  if (lhs.kind === "DelayedApply") {
    if (!(lhs.target.kind === "Lambda" && lambdaIsDefined(lhs.target))) {
      return sameInCtx(ctx, applyWithDelay(lhs.target, lhs.arg), rhs)
    }
  }

  if (rhs.kind === "DelayedApply") {
    if (!(rhs.target.kind === "Lambda" && lambdaIsDefined(rhs.target))) {
      return sameInCtx(ctx, lhs, applyWithDelay(rhs.target, rhs.arg))
    }
  }

  return false
}

function sameNeutralInCtx(ctx: Ctx, lhs: Neutral, rhs: Neutral): boolean {
  if (lhs.kind === "Var" && rhs.kind === "Var") {
    return rhs.name === lhs.name
  }

  if (lhs.kind === "Apply" && rhs.kind === "Apply") {
    return (
      sameNeutralInCtx(ctx, lhs.target, rhs.target) &&
      sameInCtx(ctx, lhs.arg, rhs.arg)
    )
  }

  return false
}
