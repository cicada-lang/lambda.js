import dedent from "dedent"
import type { Definition } from "../definition/Definition.ts"
import { expIndirectFreeNames } from "../exp/expIndirectFreeNames.ts"
import * as Exps from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/index.ts"

export function occurCheck(mod: Mod, definition: Definition): void {
  const indirectFreeNames = expIndirectFreeNames(mod, definition.exp)

  if (!indirectFreeNames.has(definition.name)) return

  if (definition.exp.kind !== "Lambda") {
    throw new Error(dedent`
      [occurCheck] Only function can be recursive.

        non-function exp: ${formatExp(definition.exp)}
        recursive name: ${definition.name}
      `)
  }

  definition.exp = Exps.LambdaRec(
    definition.name,
    definition.exp.name,
    definition.exp.ret,
  )
}
