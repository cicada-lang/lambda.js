import type { Value } from "../value/Value.ts"
import type { Mod } from "./Mod.ts"
import { modFind } from "./modFind.ts"

export function modFindValue(mod: Mod, name: string): Value | undefined {
  const def = modFind(mod, name)
  if (def === undefined) return undefined
  return def.value
}
