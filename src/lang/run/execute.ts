import dedent from "dedent"
import { emptyEnv } from "../env/index.ts"
import { emptyEquivalentCtx, equivalent } from "../equivalent/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { type Exp } from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/Mod.ts"
import { readback } from "../readback/index.ts"
import type { Stmt } from "../stmt/Stmt.ts"

export function execute(mod: Mod, stmt: Stmt): null {
  if (stmt.kind === "AssertEqual") {
    for (let i = 0; i < stmt.exps.length - 1; i++) {
      assertEqual(mod, stmt.exps[i], stmt.exps[i + 1])
    }

    return null
  }

  if (stmt.kind === "AssertNotEqual") {
    for (let i = 0; i < stmt.exps.length - 1; i++) {
      assertNotEqual(mod, stmt.exps[i], stmt.exps[i + 1])
    }

    return null
  }

  if (stmt.kind === "Compute") {
    const value = evaluate(mod, emptyEnv(), stmt.exp)
    const exp = readback(value)
    console.log(formatExp(exp))
    return null
  }

  return null
}

function assertEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, emptyEnv(), left)
  const rightValue = evaluate(mod, emptyEnv(), right)
  if (!equivalent(emptyEquivalentCtx(), leftValue, rightValue)) {
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
  if (equivalent(emptyEquivalentCtx(), leftValue, rightValue)) {
    throw new Error(dedent`
      [assertNotEqual] Fail to assert NOT equal.

        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}
