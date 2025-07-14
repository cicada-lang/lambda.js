import { modOwnDefs, type Mod } from "../mod/index.ts"
import { assertAllNamesDefined } from "./assertAllNamesDefined.ts"
import { define } from "./define.ts"
import { execute } from "./execute.ts"

export function runMod(mod: Mod): void {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) define(mod, stmt)

  for (const def of modOwnDefs(mod).values()) assertAllNamesDefined(mod, def)

  for (const stmt of mod.stmts) execute(mod, stmt)

  mod.isFinished = true
}
