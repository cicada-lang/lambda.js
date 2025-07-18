import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Value } from "../value/index.ts"
import { applyOneStep, evaluateWithDelay } from "./evaluateWithDelay.ts"

export function apply(target: Value, arg: Value): Value {
  let result = applyOneStep(target, arg)
  while (result.kind === "DelayedApply") {
    result = apply(result.target, result.arg)
  }

  return result
}

export function evaluate(mod: Mod, env: Env, exp: Exp): Value {
  const value = evaluateWithDelay(mod, env, exp)
  if (value.kind === "DelayedApply") {
    return apply(value.target, value.arg)
  }

  return value
}
