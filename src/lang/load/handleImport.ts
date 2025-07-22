import { modDefine, modFind, modResolve } from "../mod/index.ts"
import type { Mod } from "../mod/Mod.ts"
import type { ImportEntry, Stmt } from "../stmt/Stmt.ts"
import { load } from "./load.ts"

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
    throw new Error(`[import] A module can not import itself: ${path}`)
  }

  const importedMod = await load(url)

  const { name, rename } = entry
  const def = modFind(importedMod, name)
  if (def === undefined) {
    throw new Error(
      `[import] I can not import undefined name: ${name}, from path: ${path}`,
    )
  }

  const localName = rename || name
  if (modFind(mod, localName)) {
    throw new Error(`[import] I can not redefine name: ${localName}`)
  }

  modDefine(mod, localName, def)
}
