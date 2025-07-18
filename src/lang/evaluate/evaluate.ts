import { envFindValue, envUpdate, type Env } from "../env/index.ts"
import { bindsToArray, type Exp } from "../exp/index.ts"
import { modFindValue, type Mod } from "../mod/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

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

export function applyOneStep(target: Value, arg: Value): Value {
  switch (target.kind) {
    case "NotYet": {
      return Values.NotYet(Neutrals.Apply(target.neutral, arg))
    }

    case "Lambda": {
      return evaluateWithDelay(
        target.mod,
        envUpdate(target.env, target.name, arg),
        target.ret,
      )
    }

    case "Lazy": {
      return applyOneStep(Values.lazyActive(target), arg)
    }

    case "DelayedApply": {
      return Values.DelayedApply(applyOneStep(target.target, target.arg), arg)
    }
  }
}

export function evaluateWithDelay(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp.kind) {
    case "Var": {
      let value = undefined

      value = envFindValue(env, exp.name)
      if (value !== undefined) return value

      value = modFindValue(mod, exp.name)
      if (value !== undefined) return value

      throw new Error(`Unknown name: ${exp.name}`)
    }

    case "Lambda": {
      return Values.Lambda(mod, env, exp.name, exp.ret)
    }

    case "Apply": {
      const target = evaluateWithDelay(mod, env, exp.target)
      const arg = Values.Lazy(mod, env, exp.arg)
      return Values.DelayedApply(target, arg)
    }

    case "Let": {
      const oldEnv = env
      for (const bind of bindsToArray(exp.binds)) {
        env = envUpdate(
          env,
          bind.name,
          evaluateWithDelay(mod, oldEnv, bind.exp),
        )
      }

      return evaluateWithDelay(mod, env, exp.body)
    }
  }
}
