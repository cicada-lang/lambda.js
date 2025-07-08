import type { Def } from "../def/Def.ts"
import { formatExp } from "../format/formatExp.ts"
import { modFind, type Mod } from "../mod/index.ts"

export function assertAllNamesDefined(mod: Mod, def: Def): void {
  for (const name of def.freeNames) {
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
