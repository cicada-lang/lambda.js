import dedent from "dedent"
import { arraySlide2 } from "../../utils/array/arraySlide2.ts"
import { emptyEnv } from "../env/index.ts"
import { equal } from "../equal/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { type Exp } from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/Mod.ts"
import { readback } from "../readback/index.ts"
import type { Stmt } from "../stmt/Stmt.ts"

export function execute(mod: Mod, stmt: Stmt): null {
  if (stmt.kind === "AssertEqual") {
    arraySlide2(stmt.exps, (x, y) => assertEqual(mod, x, y))
    return null
  }

  if (stmt.kind === "AssertNotEqual") {
    arraySlide2(stmt.exps, (x, y) => assertNotEqual(mod, x, y))
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
