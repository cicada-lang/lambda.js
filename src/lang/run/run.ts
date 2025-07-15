import type { Def } from "../def/Def.ts"
import { expFreeNames } from "../exp/expFreeNames.ts"
import { formatExp } from "../format/formatExp.ts"
import { modFind, modOwnDefs, type Mod } from "../mod/index.ts"
import { define } from "./define.ts"
import { execute } from "./execute.ts"

export function run(mod: Mod): void {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) define(mod, stmt)

  for (const def of modOwnDefs(mod).values()) assertAllNamesDefined(mod, def)

  for (const stmt of mod.stmts) execute(mod, stmt)

  mod.isFinished = true
}

function assertAllNamesDefined(mod: Mod, def: Def): void {
  const freeNames = expFreeNames(new Set(), def.exp)
  for (const name of freeNames) {
    if (modFind(mod, name) === undefined) {
      throw new Error(
        [
          `I find undefined name: ${name}`,
          `  defining: ${def.name}`,
          `  body: ${formatExp(def.exp)}`,
        ].join("\n"),
      )
    }
  }
}
