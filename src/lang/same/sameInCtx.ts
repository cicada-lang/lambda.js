import { freshen } from "../../utils/freshen.ts"
import { applyOneStep } from "../evaluate/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Neutral, type Value } from "../value/index.ts"
import { ctxUseName, type Ctx } from "./Ctx.ts"

export function sameInCtx(ctx: Ctx, left: Value, right: Value): boolean {
  left = Values.lazyActiveDeep(left)
  right = Values.lazyActiveDeep(right)

  if (left.kind === "NotYet" && right.kind === "NotYet") {
    return sameNeutralInCtx(ctx, left.neutral, right.neutral)
  }

  if (left.kind === "Lambda" && right.kind === "Lambda") {
    if (left.definedName === right.definedName) {
      return true
    }
  }

  if (left.kind === "Lambda" && left.definedName === undefined) {
    if (right.kind === "Lambda" && right.definedName !== undefined) {
      return false
    }

    const freshName = freshen(ctx.usedNames, left.name)
    ctx = ctxUseName(ctx, freshName)
    const arg = Values.NotYet(Neutrals.Var(freshName))
    return sameInCtx(ctx, applyOneStep(left, arg), applyOneStep(right, arg))
  }

  if (right.kind === "Lambda" && right.definedName === undefined) {
    if (left.kind === "Lambda" && left.definedName !== undefined) {
      return false
    }

    const freshName = freshen(ctx.usedNames, right.name)
    ctx = ctxUseName(ctx, freshName)
    const arg = Values.NotYet(Neutrals.Var(freshName))
    return sameInCtx(ctx, applyOneStep(left, arg), applyOneStep(right, arg))
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
    !(left.target.kind === "Lambda" && left.target.definedName !== undefined)
  ) {
    return sameInCtx(ctx, applyOneStep(left.target, left.arg), right)
  }

  if (
    right.kind === "DelayedApply" &&
    !(right.target.kind === "Lambda" && right.target.definedName !== undefined)
  ) {
    return sameInCtx(ctx, left, applyOneStep(right.target, right.arg))
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
