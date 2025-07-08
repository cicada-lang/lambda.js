import { type Def } from "../def/index.ts"
import { type Stmt } from "../stmt/index.ts"

export type Mod = {
  url: URL
  loadedMods: Map<string, { mod: Mod; text: string }>
  defs: Map<string, Def>
  stmts: Array<Stmt>
  isFinished?: boolean
}
