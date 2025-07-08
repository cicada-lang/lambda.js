import * as Actions from "../actions/index.ts"
import { envExtend, envFindValue, type Env } from "../env/index.ts"
import { substBindings, type Exp } from "../exp/index.ts"
import { modFindValue, type Mod } from "../mod/index.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

export function evaluate(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp.kind) {
    case "Var": {
      let value = undefined

      value = envFindValue(env, exp.name)
      if (value !== undefined) return value

      value = modFindValue(mod, exp.name)
      if (value !== undefined) return value

      throw new Error(`Unknown name: ${exp.name}`)
    }

    case "Fn": {
      return Values.Fn(mod, env, exp.name, exp.ret)
    }

    case "FnRec": {
      return Values.FnRec(mod, env, exp.recName, exp.name, exp.ret)
    }

    case "Ap": {
      const target = evaluate(mod, env, exp.target)
      const arg = Values.Lazy(mod, env, exp.arg)
      return Actions.doAp(target, arg)
    }

    case "Let": {
      let newEnv = env
      for (const binding of substBindings(exp.subst)) {
        newEnv = envExtend(
          newEnv,
          binding.name,
          evaluate(mod, env, binding.exp),
        )
      }

      return evaluate(mod, newEnv, exp.body)
    }
  }
}
