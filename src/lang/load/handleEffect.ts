import { emptyEnv } from "../env/index.ts"
import { equal } from "../equal/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { formatExp } from "../format/index.ts"
import type { Mod } from "../mod/index.ts"
import { readback } from "../readback/index.ts"
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

    throw new Error(
      `[assert-equal] fail:\n` +
        `  lhs: ${formatExp(stmt.lhs)}\n` +
        `  rhs: ${formatExp(stmt.rhs)}\n`,
    )
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

    throw new Error(
      `[assert-not-equal] fail:\n` +
        `  lhs: ${formatExp(stmt.lhs)}\n` +
        `  rhs: ${formatExp(stmt.rhs)}\n`,
    )
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

    throw new Error(
      `[assert-same] fail:\n` +
        `  lhs: ${formatExp(stmt.lhs)}\n` +
        `  rhs: ${formatExp(stmt.rhs)}\n`,
    )
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

    throw new Error(
      `[assert-not-same] fail:\n` +
        `  lhs: ${formatExp(stmt.lhs)}\n` +
        `  rhs: ${formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "Compute") {
    const value = evaluate(mod, emptyEnv(), stmt.exp)
    const exp = readback(value)
    console.log(formatExp(exp))
    return
  }
}
