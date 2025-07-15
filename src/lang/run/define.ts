import { envEmpty } from "../env/Env.ts"
import { evaluate } from "../evaluate/evaluate.ts"
import { modDefine, modFind, modResolve } from "../mod/index.ts"
import type { Mod } from "../mod/Mod.ts"
import type { ImportEntry, Stmt } from "../stmt/Stmt.ts"
import { run } from "./run.ts"

export function define(mod: Mod, stmt: Stmt): null {
  switch (stmt.kind) {
    case "Define": {
      modDefine(mod, stmt.name, {
        mod,
        name: stmt.name,
        exp: stmt.exp,
        value: evaluate(mod, envEmpty(), stmt.exp),
      })

      return null
    }

    case "Import": {
      for (const entry of stmt.entries) {
        importOne(mod, stmt.path, entry)
      }

      return null
    }

    default: {
      return null
    }
  }
}

function importOne(mod: Mod, path: string, entry: ImportEntry): void {
  const url = modResolve(mod, path)
  if (url.href === mod.url.href) {
    throw new Error(`I can not circular import: ${path}`)
  }

  const found = mod.loadedMods.get(url.href)
  if (found === undefined) {
    throw new Error(`Mod is not loaded: ${path}`)
  }

  run(found.mod)

  const { name, rename } = entry

  const def = modFind(found.mod, name)
  if (def === undefined) {
    throw new Error(
      `I can not import undefined name: ${name}, from path: ${path}`,
    )
  }

  modDefine(mod, rename || name, def)
}
