import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Neutral } from "../neutral/index.ts"

export type Value = NotYet | Lambda | LambdaRec | Lazy
export type NotYet = { kind: "NotYet"; neutral: Neutral }
export type Lazy = { kind: "Lazy"; mod: Mod; env: Env; exp: Exp; cache?: Value }
export type Lambda = {
  kind: "Lambda"
  mod: Mod
  env: Env
  name: string
  ret: Exp
}
export type LambdaRec = {
  kind: "LambdaRec"
  mod: Mod
  env: Env
  recName: string
  name: string
  ret: Exp
}

export function NotYet(neutral: Neutral): NotYet {
  return {
    kind: "NotYet",
    neutral,
  }
}

export function Lazy(mod: Mod, env: Env, exp: Exp, cache?: Value): Lazy {
  return {
    kind: "Lazy",
    mod,
    env,
    exp,
    cache,
  }
}

export function Lambda(mod: Mod, env: Env, name: string, ret: Exp): Lambda {
  return {
    kind: "Lambda",
    mod,
    env,
    name,
    ret,
  }
}

export function LambdaRec(
  mod: Mod,
  env: Env,
  recName: string,
  name: string,
  ret: Exp,
): LambdaRec {
  return {
    kind: "LambdaRec",
    mod,
    env,
    recName,
    name,
    ret,
  }
}
