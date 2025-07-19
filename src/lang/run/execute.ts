import dedent from "dedent"
import { emptyEnv } from "../env/index.ts"
import { equal } from "../equal/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { type Exp } from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/Mod.ts"
import { readback } from "../readback/index.ts"
import { same } from "../same/index.ts"
import type { Stmt } from "../stmt/Stmt.ts"

export function execute(mod: Mod, stmt: Stmt): void {
  if (stmt.kind === "AssertEqual") {
    assertEqual(mod, stmt.lhs, stmt.rhs)
    return
  }

  if (stmt.kind === "AssertNotEqual") {
    assertNotEqual(mod, stmt.lhs, stmt.rhs)
    return
  }

  if (stmt.kind === "AssertSame") {
    assertSame(mod, stmt.lhs, stmt.rhs)
    return
  }

  if (stmt.kind === "AssertNotSame") {
    assertNotSame(mod, stmt.lhs, stmt.rhs)
    return
  }

  if (stmt.kind === "Compute") {
    const value = evaluate(mod, emptyEnv(), stmt.exp)
    const exp = readback(value)
    console.log(formatExp(exp))
    return
  }
}

function assertEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, emptyEnv(), left)
  const rightValue = evaluate(mod, emptyEnv(), right)
  if (!equal(leftValue, rightValue)) {
    throw new Error(dedent`
      [assertEqual] Fail to assert equal.

        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}

function assertNotEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, emptyEnv(), left)
  const rightValue = evaluate(mod, emptyEnv(), right)
  if (equal(leftValue, rightValue)) {
    throw new Error(dedent`
      [assertNotEqual] Fail to assert NOT equal.

        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}

function assertSame(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, emptyEnv(), left)
  const rightValue = evaluate(mod, emptyEnv(), right)
  if (!same(leftValue, rightValue)) {
    throw new Error(dedent`
      [assertSame] Fail to assert equal.

        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}

function assertNotSame(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, emptyEnv(), left)
  const rightValue = evaluate(mod, emptyEnv(), right)
  if (same(leftValue, rightValue)) {
    throw new Error(dedent`
      [assertNotSame] Fail to assert NOT equal.

        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}
