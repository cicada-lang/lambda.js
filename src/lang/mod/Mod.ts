import { emptyEnv } from "../env/Env.ts"
import { evaluate } from "../evaluate/evaluate.ts"
import { type Exp } from "../exp/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { type Value } from "../value/index.ts"

export type Def = {
  mod: Mod
  name: string
  exp: Exp
  freeNames?: Set<string>
  value?: Value
}

export type Mod = {
  url: URL
  defs: Map<string, Def>
  stmts: Array<Stmt>
  isFinished?: boolean
}

export function createMod(url: URL): Mod {
  return {
    url,
    defs: new Map(),
    stmts: [],
  }
}

export function modDefine(mod: Mod, name: string, def: Def): void {
  mod.defs.set(name, def)
}

export function modFind(mod: Mod, name: string): Def | undefined {
  return mod.defs.get(name)
}

export function modFindValue(mod: Mod, name: string): Value | undefined {
  const def = modFind(mod, name)
  if (def === undefined) return undefined

  if (def.value) return def.value

  const value = evaluate(def.mod, emptyEnv(), def.exp)
  if (value.kind === "Lambda" && value.definedName === undefined) {
    value.definedName = def.name
  }

  def.value = value
  return value
}

export function modResolve(mod: Mod, href: string): URL {
  return new URL(href, mod.url)
}

export function modOwnDefs(mod: Mod): Map<string, Def> {
  const ownDefs = new Map()
  for (const [name, def] of mod.defs) {
    if (def.mod.url.href === mod.url.href) {
      ownDefs.set(name, def)
    }
  }

  return ownDefs
}
