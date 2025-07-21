import dedent from "dedent"
import { emptyEnv } from "../env/index.ts"
import { equal } from "../equal/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { formatExp, formatValue } from "../format/index.ts"
import type { Mod } from "../mod/index.ts"
import { same } from "../same/index.ts"
import type { Stmt } from "../stmt/index.ts"

export async function handleEffect(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "AssertEqual") {
    if (
      equal(
        evaluate(mod, emptyEnv(), stmt.lhs),
        evaluate(mod, emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(dedent`
      [assert-equal] fail:
        lhs: ${formatExp(stmt.lhs)}
        rhs: ${formatExp(stmt.rhs)}
      `)
  }

  if (stmt.kind === "AssertNotEqual") {
    if (
      !equal(
        evaluate(mod, emptyEnv(), stmt.lhs),
        evaluate(mod, emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(dedent`
      [assert-not-equal] fail:
        lhs: ${formatExp(stmt.lhs)}
        rhs: ${formatExp(stmt.rhs)}
      `)
  }

  if (stmt.kind === "AssertSame") {
    if (
      same(
        evaluate(mod, emptyEnv(), stmt.lhs),
        evaluate(mod, emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(dedent`
      [assert-same] fail:
        lhs: ${formatExp(stmt.lhs)}
        rhs: ${formatExp(stmt.rhs)}
      `)
  }

  if (stmt.kind === "AssertNotSame") {
    if (
      !same(
        evaluate(mod, emptyEnv(), stmt.lhs),
        evaluate(mod, emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(dedent`
      [assert-not-same] fail:
        lhs: ${formatExp(stmt.lhs)}
        rhs: ${formatExp(stmt.rhs)}
      `)
  }

  if (stmt.kind === "Compute") {
    const value = evaluate(mod, emptyEnv(), stmt.exp)
    console.log(formatValue(value))
    return
  }
}
