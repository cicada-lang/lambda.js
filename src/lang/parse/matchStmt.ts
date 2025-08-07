import * as X from "@xieyuheng/x-data.js"
import * as Exps from "../exp/index.ts"
import * as Stmts from "../stmt/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { matchExp } from "./matchExp.ts"

const stmtMatcher: X.Matcher<Stmt> = X.matcherChoice<Stmt>([
  X.matcher("`(define ,(cons name args) ,exp)", ({ name, args, exp }) =>
    Stmts.Define(
      X.symbolToString(name),
      X.dataToArray(args)
        .map(X.symbolToString)
        .reduceRight((fn, name) => Exps.Lambda(name, fn), matchExp(exp)),
    ),
  ),

  X.matcher("`(define ,name ,exp)", ({ name, exp }) =>
    Stmts.Define(X.symbolToString(name), matchExp(exp)),
  ),

  X.matcher("(cons* 'import source entries)", ({ source, entries }) =>
    Stmts.Import(
      X.dataToString(source),
      X.dataToArray(entries).map(matchImportEntry),
    ),
  ),

  X.matcher("`(assert-equal ,lhs ,rhs)", ({ lhs, rhs }) =>
    Stmts.AssertEqual(matchExp(lhs), matchExp(rhs)),
  ),

  X.matcher("`(assert-not-equal ,lhs ,rhs)", ({ lhs, rhs }) =>
    Stmts.AssertNotEqual(matchExp(lhs), matchExp(rhs)),
  ),

  X.matcher("`(assert-same ,lhs ,rhs)", ({ lhs, rhs }) =>
    Stmts.AssertSame(matchExp(lhs), matchExp(rhs)),
  ),

  X.matcher("`(assert-not-same ,lhs ,rhs)", ({ lhs, rhs }) =>
    Stmts.AssertNotSame(matchExp(lhs), matchExp(rhs)),
  ),

  X.matcher("exp", ({ exp }) => Stmts.Compute(matchExp(exp))),
])

export function matchStmt(data: X.Data): Stmt {
  return X.match(stmtMatcher, data)
}

function matchImportEntry(data: X.Data): Stmts.ImportEntry {
  return X.match(
    X.matcherChoice([
      X.matcher("`(rename ,name ,rename)", ({ name, rename }) => ({
        name: X.symbolToString(name),
        rename: X.symbolToString(rename),
      })),

      X.matcher("name", ({ name }) => ({ name: X.symbolToString(name) })),
    ]),
    data,
  )
}
