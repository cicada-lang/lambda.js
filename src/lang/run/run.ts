import { expFreeNames } from "../exp/expFreeNames.ts"
import { formatExp } from "../format/formatExp.ts"
import { modFind, modOwnDefs, type Def, type Mod } from "../mod/index.ts"
import { handleDefine } from "./handleDefine.ts"
import { handleEffect } from "./handleEffect.ts"
import { handleImport } from "./handleImport.ts"

export function run(mod: Mod): void {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) handleImport(mod, stmt)
  for (const stmt of mod.stmts) handleDefine(mod, stmt)

  for (const def of modOwnDefs(mod).values()) assertAllNamesDefined(mod, def)

  for (const stmt of mod.stmts) handleEffect(mod, stmt)

  mod.isFinished = true
}

function assertAllNamesDefined(mod: Mod, def: Def): void {
  const freeNames = expFreeNames(new Set(), def.exp)
  for (const name of freeNames) {
    if (modFind(mod, name) === undefined) {
      throw new Error(
        [
          `[run] I find undefined name: ${name}`,
          `  defining: ${def.name}`,
          `  body: ${formatExp(def.exp)}`,
        ].join("\n"),
      )
    }
  }
}
