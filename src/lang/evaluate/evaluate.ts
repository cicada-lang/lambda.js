import * as Actions from "../actions/index.ts"
import { envExtend, envFindValue, type Env } from "../env/index.ts"
import { bindsToArray, type Exp } from "../exp/index.ts"
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

    case "Lambda": {
      return Values.Lambda(mod, env, exp.name, exp.ret)
    }

    case "LambdaRec": {
      return Values.LambdaRec(mod, env, exp.recName, exp.name, exp.ret)
    }

    case "Apply": {
      const target = evaluate(mod, env, exp.target)
      const arg = Values.Lazy(mod, env, exp.arg)
      return Actions.doApply(target, arg)
    }

    case "Let": {
      let newEnv = env
      for (const bind of bindsToArray(exp.binds)) {
        newEnv = envExtend(newEnv, bind.name, evaluate(mod, env, bind.exp))
      }

      return evaluate(mod, newEnv, exp.body)
    }
  }
}
