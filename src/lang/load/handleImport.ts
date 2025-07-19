import { modDefine, modFind, modResolve } from "../mod/index.ts"
import type { Mod } from "../mod/Mod.ts"
import type { ImportEntry, Stmt } from "../stmt/Stmt.ts"
import { globalLoadedMods } from "./globalLoadedMods.ts"

export async function handleImport(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "Import") {
    for (const entry of stmt.entries) {
      await importOne(mod, stmt.path, entry)
    }

    return
  }
}

async function importOne(
  mod: Mod,
  path: string,
  entry: ImportEntry,
): Promise<void> {
  const url = modResolve(mod, path)
  if (url.href === mod.url.href) {
    throw new Error(`I can not circular import: ${path}`)
  }

  const found = globalLoadedMods.get(url.href)
  if (found === undefined) {
    throw new Error(`Mod is not loaded: ${path}`)
  }

  const { name, rename } = entry

  const def = modFind(found.mod, name)
  if (def === undefined) {
    throw new Error(
      `I can not import undefined name: ${name}, from path: ${path}`,
    )
  }

  modDefine(mod, rename || name, def)
}
