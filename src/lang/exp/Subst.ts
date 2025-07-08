import type { Exp } from "../exp/index.ts"

export type Binding = {
  name: string
  exp: Exp
}

export type Subst = Map<string, Binding>

export function substIsEmpty(subst: Subst): boolean {
  return subst.size === 0
}

export function substFromBindings(bindings: Array<Binding>): Subst {
  return new Map([
    ...bindings.map<[string, Binding]>((binding) => [binding.name, binding]),
  ])
}

export function substBindings(subst: Subst): Array<Binding> {
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
    ...Array.from(subst.values()).map<[string, Binding]>(({ name, exp }) => [
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
