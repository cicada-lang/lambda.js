import { type Value } from "../value/index.ts"

export type Neutral = Var | Apply
export type Var = { kind: "Var"; name: string }
export type Apply = { kind: "Apply"; target: Neutral; arg: Value }

export function Var(name: string): Var {
  return {
    kind: "Var",
    name,
  }
}

export function Apply(target: Neutral, arg: Value): Apply {
  return {
    kind: "Apply",
    target,
    arg,
  }
}
