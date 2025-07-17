import { type Def } from "../def/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { type Value } from "../value/index.ts"

export type Mod = {
  url: URL
  loadedMods: Map<string, { mod: Mod; text: string }>
  defs: Map<string, Def>
  stmts: Array<Stmt>
  isFinished?: boolean
}

export function createMod(options: {
  url: URL
  loadedMods: Map<string, { mod: Mod; text: string }>
}): Mod {
  const { url, loadedMods } = options

  return {
    url,
    loadedMods,
    defs: new Map(),
    stmts: [],
  }
}
export function modDefine(mod: Mod, name: string, def: Def): void {
  assertNotRedefine(mod, name)
  mod.defs.set(name, def)
}

function assertNotRedefine(mod: Mod, name: string): void {
  if (modFind(mod, name)) {
    throw new Error(`I can not redefine name: ${name}`)
  }
}

export function modFind(mod: Mod, name: string): Def | undefined {
  return mod.defs.get(name)
}

export function modFindValue(mod: Mod, name: string): Value | undefined {
  const def = modFind(mod, name)
  if (def === undefined) return undefined
  return def.value
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
