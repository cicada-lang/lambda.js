import dedent from "dedent"
import type { Def } from "../def/Def.ts"
import { expIndirectFreeNames } from "../exp/expIndirectFreeNames.ts"
import * as Exps from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import type { Mod } from "../mod/index.ts"

export function occurCheck(mod: Mod, def: Def): void {
  const indirectFreeNames = expIndirectFreeNames(mod, def.exp)

  if (!indirectFreeNames.has(def.name)) return

  if (def.exp.kind !== "Lambda") {
    throw new Error(dedent`
      [occurCheck] Only function can be recursive.

        non-function exp: ${formatExp(def.exp)}
        recursive name: ${def.name}
      `)
  }

  def.exp = Exps.LambdaRec(def.name, def.exp.name, def.exp.ret)
}
