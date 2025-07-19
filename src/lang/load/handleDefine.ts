import { emptyEnv } from "../env/Env.ts"
import { evaluate } from "../evaluate/evaluate.ts"
import { modDefine } from "../mod/index.ts"
import type { Mod } from "../mod/Mod.ts"
import type { Stmt } from "../stmt/Stmt.ts"

export async function handleDefine(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "Define") {
    const value = evaluate(mod, emptyEnv(), stmt.exp)
    if (value.kind === "Lambda") {
      value.definedName = stmt.name
    }

    modDefine(mod, stmt.name, {
      mod,
      name: stmt.name,
      exp: stmt.exp,
      value,
    })

    return
  }
}
