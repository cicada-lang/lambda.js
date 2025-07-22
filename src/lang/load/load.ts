import { ParsingError } from "@xieyuheng/x-data.js"
import fs from "node:fs"
import { expFreeNames } from "../exp/expFreeNames.ts"
import { formatExp } from "../format/formatExp.ts"
import {
  createMod,
  modFind,
  modOwnDefs,
  type Def,
  type Mod,
} from "../mod/index.ts"
import { parseStmts } from "../parse/index.ts"
import { globalLoadedMods } from "./globalLoadedMods.ts"
import { handleDefine } from "./handleDefine.ts"
import { handleEffect } from "./handleEffect.ts"
import { handleImport } from "./handleImport.ts"

export async function load(url: URL): Promise<Mod> {
  const found = globalLoadedMods.get(url.href)
  if (found !== undefined) return found.mod

  const text = await fs.promises.readFile(url.pathname, "utf8")

  try {
    const mod = createMod(url)
    mod.stmts = parseStmts(text)
    globalLoadedMods.set(url.href, { mod, text })
    await run(mod)
    return mod
  } catch (error) {
    if (error instanceof ParsingError) {
      throw new Error(error.report(text))
    }

    throw error
  }
}

async function run(mod: Mod): Promise<void> {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) await handleDefine(mod, stmt)
  for (const stmt of mod.stmts) await handleImport(mod, stmt)

  for (const def of modOwnDefs(mod).values()) postprocessDef(mod, def)

  for (const stmt of mod.stmts) await handleEffect(mod, stmt)

  mod.isFinished = true
}

function postprocessDef(mod: Mod, def: Def): void {
  def.freeNames = expFreeNames(new Set(), def.exp)
  for (const name of def.freeNames) {
    if (modFind(mod, name) === undefined) {
      throw new Error(
        [
          `[load] I find undefined name: ${name}`,
          `  defining: ${def.name}`,
          `  body: ${formatExp(def.exp)}`,
        ].join("\n"),
      )
    }
  }
}
