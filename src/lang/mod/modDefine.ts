import type { Def } from "../def/Def.ts"
import type { Mod } from "./Mod.ts"
import { modFind } from "./modFind.ts"

export function modDefine(mod: Mod, name: string, def: Def): void {
  assertNotRedefine(mod, name)
  mod.defs.set(name, def)
}

function assertNotRedefine(mod: Mod, name: string): void {
  if (modFind(mod, name)) {
    throw new Error(`I can not redefine name: ${name}`)
  }
}
