import { type Exp } from "../exp/index.ts"

export type Stmt =
  | AssertEqual
  | AssertNotEqual
  | AssertSame
  | AssertNotSame
  | Compute
  | Define
  | Import

export type AssertEqual = { kind: "AssertEqual"; lhs: Exp; rhs: Exp }
export type AssertNotEqual = { kind: "AssertNotEqual"; lhs: Exp; rhs: Exp }
export type AssertSame = { kind: "AssertSame"; lhs: Exp; rhs: Exp }
export type AssertNotSame = { kind: "AssertNotSame"; lhs: Exp; rhs: Exp }
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

export function AssertEqual(lhs: Exp, rhs: Exp): AssertEqual {
  return {
    kind: "AssertEqual",
    lhs,
    rhs,
  }
}

export function AssertNotEqual(lhs: Exp, rhs: Exp): AssertNotEqual {
  return {
    kind: "AssertNotEqual",
    lhs,
    rhs,
  }
}

export function AssertSame(lhs: Exp, rhs: Exp): AssertSame {
  return {
    kind: "AssertSame",
    lhs,
    rhs,
  }
}

export function AssertNotSame(lhs: Exp, rhs: Exp): AssertNotSame {
  return {
    kind: "AssertNotSame",
    lhs,
    rhs,
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
