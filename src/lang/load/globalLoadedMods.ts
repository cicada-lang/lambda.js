import { type Mod } from "../mod/index.ts"

type LoadedMod = { mod: Mod; text: string }

export const globalLoadedMods: Map<string, LoadedMod> = new Map()
