import { modDefine } from "../mod/index.ts"
import type { Mod } from "../mod/Mod.ts"
import type { Stmt } from "../stmt/Stmt.ts"
import { importOne } from "./importOne.ts"

export function define(mod: Mod, stmt: Stmt): null {
  switch (stmt.kind) {
    case "Define": {
      modDefine(mod, stmt.name, {
        mod,
        name: stmt.name,
        exp: stmt.exp,
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
