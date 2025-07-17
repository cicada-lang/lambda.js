import { type Exp } from "../exp/index.ts"

export type Stmt = AssertEqual | AssertNotEqual | Compute | Define | Import
export type AssertEqual = { kind: "AssertEqual"; exps: Array<Exp> }
export type AssertNotEqual = { kind: "AssertNotEqual"; exps: Array<Exp> }
export type Compute = { kind: "Compute"; exp: Exp }
export type Define = { kind: "Define"; name: string; exp: Exp }
export type Import = {
  kind: "Import"
  path: string
  entries: Array<ImportEntry>
}

export type ImportEntry = {
  name: string
  rename?: string
}

export function AssertEqual(exps: Array<Exp>): AssertEqual {
  return {
    kind: "AssertEqual",
    exps,
  }
}

export function AssertNotEqual(exps: Array<Exp>): AssertNotEqual {
  return {
    kind: "AssertNotEqual",
    exps,
  }
}

export function Compute(exp: Exp): Compute {
  return {
    kind: "Compute",
    exp,
  }
}

export function Define(name: string, exp: Exp): Define {
  return {
    kind: "Define",
    name,
    exp,
  }
}

export function Import(path: string, entries: Array<ImportEntry>): Import {
  return {
    kind: "Import",
    path,
    entries,
  }
}
