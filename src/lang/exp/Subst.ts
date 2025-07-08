import type { Exp } from "../exp/index.ts"

export type Bind = {
  name: string
  exp: Exp
}

export type Subst = Map<string, Bind>

export function substIsEmpty(subst: Subst): boolean {
  return subst.size === 0
}

export function substFromBinds(binds: Array<Bind>): Subst {
  return new Map([...binds.map<[string, Bind]>((bind) => [bind.name, bind])])
}

export function substBinds(subst: Subst): Array<Bind> {
  return Array.from(subst.values())
}

export function substInitial(name: string, exp: Exp): Subst {
  return new Map([[name, { name, exp }]])
}

export function substExtend(subst: Subst, name: string, exp: Exp): Subst {
  return new Map([...subst, [name, { name, exp }]])
}

export function substMerge(left: Subst, right: Subst): Subst {
  return new Map([...left, ...right])
}

export function substMapExp(subst: Subst, f: (exp: Exp) => Exp): Subst {
  return new Map([
    ...Array.from(subst.values()).map<[string, Bind]>(({ name, exp }) => [
      name,
      { name, exp: f(exp) },
    ]),
  ])
}

export function substTakeNames(subst: Subst, names: Set<string>): Subst {
  const newSubst = new Map()
  for (const [name, exp] of subst) {
    if (names.has(name)) {
      newSubst.set(name, exp)
    }
  }

  return newSubst
}
