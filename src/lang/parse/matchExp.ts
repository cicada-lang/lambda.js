import * as X from "@xieyuheng/x-data.js"
import * as Exps from "../exp/index.ts"
import { bindsFromArray, type Bind, type Exp } from "../exp/index.ts"

const expMatcher: X.Matcher<Exp> = X.matcherChoice<Exp>([
  X.matcher("`(lambda ,names ,exp)", ({ names, exp }) =>
    X.dataToArray(names)
      .map(X.dataToString)
      .reduceRight((fn, name) => Exps.Fn(name, fn), matchExp(exp)),
  ),

  X.matcher("`(let ,binds ,body)", ({ binds, body }) =>
    Exps.Let(
      bindsFromArray(X.dataToArray(binds).map(matchBind)),
      matchExp(body),
    ),
  ),

  X.matcher("(cons target args)", ({ target, args }) =>
    X.dataToArray(args)
      .map(matchExp)
      .reduce((result, arg) => Exps.Ap(result, arg), matchExp(target)),
  ),

  X.matcher("name", ({ name }) => Exps.Var(X.dataToString(name))),
])

export function matchExp(data: X.Data): Exp {
  return X.match(expMatcher, data)
}

export function matchBind(data: X.Data): Bind {
  return X.match(
    X.matcher("`(,name ,exp)", ({ name, exp }) => ({
      name: X.dataToString(name),
      exp: matchExp(exp),
    })),
    data,
  )
}
