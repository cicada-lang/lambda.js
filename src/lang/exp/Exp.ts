import { type Binds } from "../exp/index.ts"

export type Exp = Var | Fn | FnRec | Ap | Let
export type Var = { kind: "Var"; name: string }
export type Fn = { kind: "Fn"; name: string; ret: Exp }
export type FnRec = { kind: "FnRec"; recName: string; name: string; ret: Exp }
export type Ap = { kind: "Ap"; target: Exp; arg: Exp }
export type Let = { kind: "Let"; binds: Binds; body: Exp }

export function Var(name: string): Var {
  return { kind: "Var", name }
}

export function Fn(name: string, ret: Exp): Fn {
  return { kind: "Fn", name, ret }
}

export function FnRec(recName: string, name: string, ret: Exp): FnRec {
  return { kind: "FnRec", recName, name, ret }
}

export function Ap(target: Exp, arg: Exp): Ap {
  return { kind: "Ap", target, arg }
}

export function Let(binds: Binds, body: Exp): Let {
  return { kind: "Let", binds, body }
}
