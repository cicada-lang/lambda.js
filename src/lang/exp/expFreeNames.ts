import { substBindings } from "../exp/index.ts"
import { type Exp } from "./index.ts"

export function expFreeNames(boundNames: Set<string>, exp: Exp): Set<string> {
  switch (exp.kind) {
    case "Var": {
      return boundNames.has(exp.name) ? new Set() : new Set([exp.name])
    }

    case "Fn": {
      return expFreeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "FnRec": {
      return expFreeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "Ap": {
      return new Set([
        ...expFreeNames(boundNames, exp.target),
        ...expFreeNames(boundNames, exp.arg),
      ])
    }

    case "Let": {
      // NOTE All bindings in the subst are independent.
      const bindings = substBindings(exp.subst)
      const substFreeNames = bindings
        .map((binding) => Array.from(expFreeNames(boundNames, binding.exp)))
        .flatMap((names) => names)
      return new Set([
        ...substFreeNames,
        ...expFreeNames(
          new Set([...boundNames, ...bindings.map((binding) => binding.name)]),
          exp.body,
        ),
      ])
    }
  }
}
