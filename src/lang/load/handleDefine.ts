import { modDefine } from "../mod/index.ts"
import type { Mod } from "../mod/Mod.ts"
import type { Stmt } from "../stmt/Stmt.ts"

export async function handleDefine(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "Define") {
    modDefine(mod, stmt.name, {
      mod,
      name: stmt.name,
      exp: stmt.exp,
    })

    return
  }
}
