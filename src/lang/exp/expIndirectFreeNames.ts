import assert from "node:assert"
import { setPop } from "../../utils/set/setPop.ts"
import type { Mod } from "../mod/index.ts"
import { modOwnDefs } from "../mod/index.ts"
import type { Exp } from "./Exp.ts"
import { expFreeNames } from "./expFreeNames.ts"

export function expIndirectFreeNames(mod: Mod, exp: Exp): Set<string> {
  const ownDefs = modOwnDefs(mod)
  const remainingNames = expFreeNames(new Set(), exp)
  const collectedNames = new Set<string>()

  while (remainingNames.size > 0) {
    const name = setPop(remainingNames)
    if (collectedNames.has(name)) continue

    collectedNames.add(name)

    const def = ownDefs.get(name)
    if (def === undefined) continue

    assert(def.freeNames)
    for (const freeName of def.freeNames) {
      if (!collectedNames.has(freeName)) {
        remainingNames.add(freeName)
      }
    }
  }

  return collectedNames
}
