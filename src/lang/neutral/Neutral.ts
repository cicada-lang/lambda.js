import { type LambdaRec, type Value } from "../value/index.ts"

export type Neutral = Var | Apply | ApplyRecursive
export type Var = { kind: "Var"; name: string }
export type Apply = { kind: "Apply"; target: Neutral; arg: Value }
export type ApplyRecursive = {
  kind: "ApplyRecursive"
  fn: LambdaRec
  arg: Neutral
}

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

export function ApplyRecursive(fn: LambdaRec, arg: Neutral): ApplyRecursive {
  return {
    kind: "ApplyRecursive",
    fn,
    arg,
  }
}
