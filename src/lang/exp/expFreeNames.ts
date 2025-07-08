import { substBinds } from "../exp/index.ts"
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
      // NOTE All binds in the subst are independent.
      const binds = substBinds(exp.subst)
      const substFreeNames = binds
        .map((bind) => Array.from(expFreeNames(boundNames, bind.exp)))
        .flatMap((names) => names)
      return new Set([
        ...substFreeNames,
        ...expFreeNames(
          new Set([...boundNames, ...binds.map((bind) => bind.name)]),
          exp.body,
        ),
      ])
    }
  }
}
