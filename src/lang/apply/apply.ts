import { envExtend } from "../env/Env.ts"
import { evaluate } from "../evaluate/index.ts"
import * as Neutrals from "../neutral/index.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

export function apply(target: Value, arg: Value): Value {
  switch (target.kind) {
    case "Lambda": {
      return evaluate(
        target.mod,
        envExtend(target.env, target.name, arg),
        target.ret,
      )
    }

    case "LambdaRec": {
      arg = Values.lazyActiveDeep(arg)

      if (arg.kind === "NotYet") {
        return Values.NotYet(Neutrals.ApplyRecursive(target, arg.neutral))
      }

      return evaluate(
        target.mod,
        envExtend(target.env, target.name, arg),
        target.ret,
      )
    }

    case "Lazy": {
      return apply(Values.lazyActive(target), arg)
    }

    case "NotYet": {
      return Values.NotYet(Neutrals.Apply(target.neutral, arg))
    }
  }
}
