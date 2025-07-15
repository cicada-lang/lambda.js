import dedent from "dedent"
import { envEmpty } from "../env/index.ts"
import { equivalent } from "../equivalent/index.ts"
import { evaluate } from "../evaluate/index.ts"
import { type Exp } from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/Mod.ts"

export function assertEqual(mod: Mod, left: Exp, right: Exp): void {
  const leftValue = evaluate(mod, envEmpty(), left)
  const rightValue = evaluate(mod, envEmpty(), right)
  if (!equivalent({ usedNames: new Set() }, leftValue, rightValue)) {
    throw new Error(dedent`
      [assertEqual] Fail to assert equal.
      
        left: ${formatExp(left)}
        right: ${formatExp(right)}
      `)
  }
}
