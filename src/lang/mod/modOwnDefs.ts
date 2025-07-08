import type { Def } from "../def/Def.ts"
import type { Mod } from "./Mod.ts"

export function modOwnDefs(mod: Mod): Map<string, Def> {
  const ownDefs = new Map()
  for (const [name, def] of mod.defs) {
    if (def.mod.url.href === mod.url.href) {
      ownDefs.set(name, def)
    }
  }

  return ownDefs
}
