import { modOwnDefs, type Mod } from "../mod/index.ts"
import { assertAllNamesDefined } from "./assertAllNamesDefined.ts"
import { define } from "./define.ts"
import { execute } from "./execute.ts"
import { occurCheck } from "./occurCheck.ts"

export function runMod(mod: Mod): void {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) define(mod, stmt)

  for (const def of modOwnDefs(mod).values()) assertAllNamesDefined(mod, def)

  for (const def of modOwnDefs(mod).values()) occurCheck(mod, def)

  for (const stmt of mod.stmts) {
    const output = execute(mod, stmt)
    if (output) console.log(output)
  }

  mod.isFinished = true
}
