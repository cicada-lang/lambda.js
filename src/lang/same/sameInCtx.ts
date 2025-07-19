import { freshen } from "../../utils/name/freshen.ts"
import { applyWithDelay } from "../evaluate/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import {
  lambdaIsDefined,
  lambdaSameDefined,
  type Neutral,
  type Value,
} from "../value/index.ts"
import { ctxBindName, type Ctx } from "./Ctx.ts"

export function sameInCtx(ctx: Ctx, left: Value, right: Value): boolean {
  left = Values.lazyActiveDeep(left)
  right = Values.lazyActiveDeep(right)

  if (left.kind === "NotYet" && right.kind === "NotYet") {
    return sameNeutralInCtx(ctx, left.neutral, right.neutral)
  }

  if (left.kind === "Lambda" && right.kind === "Lambda") {
    if (lambdaSameDefined(left, right)) {
      return true
    }
  }

  if (left.kind === "Lambda" && !lambdaIsDefined(left)) {
    if (right.kind === "Lambda" && lambdaIsDefined(right)) {
      return false
    }

    const freshName = freshen(ctx.boundNames, left.name)
    ctx = ctxBindName(ctx, freshName)
    const arg = Values.NotYet(Neutrals.Var(freshName))
    return sameInCtx(ctx, applyWithDelay(left, arg), applyWithDelay(right, arg))
  }

  if (right.kind === "Lambda" && !lambdaIsDefined(right)) {
    if (left.kind === "Lambda" && lambdaIsDefined(left)) {
      return false
    }

    const freshName = freshen(ctx.boundNames, right.name)
    ctx = ctxBindName(ctx, freshName)
    const arg = Values.NotYet(Neutrals.Var(freshName))
    return sameInCtx(ctx, applyWithDelay(left, arg), applyWithDelay(right, arg))
  }

  if (left.kind === "DelayedApply" && right.kind === "DelayedApply") {
    if (
      sameInCtx(ctx, left.target, right.target) &&
      sameInCtx(ctx, left.arg, right.arg)
    ) {
      return true
    }
  }

  if (
    left.kind === "DelayedApply" &&
    !(left.target.kind === "Lambda" && lambdaIsDefined(left.target))
  ) {
    return sameInCtx(ctx, applyWithDelay(left.target, left.arg), right)
  }

  if (
    right.kind === "DelayedApply" &&
    !(right.target.kind === "Lambda" && lambdaIsDefined(right.target))
  ) {
    return sameInCtx(ctx, left, applyWithDelay(right.target, right.arg))
  }

  return false
}

function sameNeutralInCtx(ctx: Ctx, left: Neutral, right: Neutral): boolean {
  if (left.kind === "Var" && right.kind === "Var") {
    return right.name === left.name
  }

  if (left.kind === "Apply" && right.kind === "Apply") {
    return (
      sameNeutralInCtx(ctx, left.target, right.target) &&
      sameInCtx(ctx, left.arg, right.arg)
    )
  }

  return false
}
