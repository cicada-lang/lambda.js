import { type Binds } from "../exp/index.ts"

export type Exp = Var | Lambda | LambdaRec | Apply | Let
export type Var = { kind: "Var"; name: string }
export type Lambda = { kind: "Lambda"; name: string; ret: Exp }
export type LambdaRec = {
  kind: "LambdaRec"
  recName: string
  name: string
  ret: Exp
}
export type Apply = { kind: "Apply"; target: Exp; arg: Exp }
export type Let = { kind: "Let"; binds: Binds; body: Exp }

export function Var(name: string): Var {
  return { kind: "Var", name }
}

export function Lambda(name: string, ret: Exp): Lambda {
  return { kind: "Lambda", name, ret }
}

export function LambdaRec(recName: string, name: string, ret: Exp): LambdaRec {
  return { kind: "LambdaRec", recName, name, ret }
}

export function Apply(target: Exp, arg: Exp): Apply {
  return { kind: "Apply", target, arg }
}

export function Let(binds: Binds, body: Exp): Let {
  return { kind: "Let", binds, body }
}
