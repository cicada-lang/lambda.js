import { type Mod } from "./Mod.ts"

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
