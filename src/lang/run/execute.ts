import { envEmpty } from "../env/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/Mod.ts"
import { readback } from "../readback/index.ts"
import type { Stmt } from "../stmt/Stmt.ts"
import { assertEqual } from "./assertEqual.ts"
import { assertNotEqual } from "./assertNotEqual.ts"

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
      const value = evaluate(mod, envEmpty(), stmt.exp)
      const exp = readback({ usedNames: new Set() }, value)
      console.log(formatExp(exp))
      return null
    }

    default: {
      return null
    }
  }
}
