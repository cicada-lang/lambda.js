import dedent from "dedent"
import { emptyEnv } from "../env/index.ts"
import { equivalent } from "../equivalent/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { type Exp } from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/Mod.ts"
import { readback } from "../readback/index.ts"
import type { Stmt } from "../stmt/Stmt.ts"

export function execute(mod: Mod, stmt: Stmt): null {
  switch (stmt.kind) {
    case "AssertEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return null
    }

    case "AssertNotEqual": {
      for (let i = 0; i < stmt.exps.length - 1; i++) {
        assertNotEqual(mod, stmt.exps[i], stmt.exps[i + 1])
      }

      return null
    }

    case "Compute": {
      const value = evaluate(mod, emptyEnv(), stmt.exp)
      const exp = readback({ usedNames: new Set() }, value)
      console.log(formatExp(exp))
      return null
    }

    default: {
      return null
    }
  }
}

function assertEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, emptyEnv(), left)
  const rightValue = evaluate(mod, emptyEnv(), right)
  if (!equivalent({ usedNames: new Set() }, leftValue, rightValue)) {
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
  if (equivalent({ usedNames: new Set() }, leftValue, rightValue)) {
    throw new Error(dedent`
      [assertNotEqual] Fail to assert NOT equal.

        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}
