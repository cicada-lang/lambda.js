import type { Exp } from "./index.ts"

export type Bind = {
  name: string
  exp: Exp
}

export type Binds = Map<string, Bind>

export function bindsIsEmpty(binds: Binds): boolean {
  return binds.size === 0
}

export function bindsFromArray(binds: Array<Bind>): Binds {
  return new Map([...binds.map<[string, Bind]>((bind) => [bind.name, bind])])
}

export function bindsToArray(binds: Binds): Array<Bind> {
  return Array.from(binds.values())
}

export function bindsInitial(name: string, exp: Exp): Binds {
  return new Map([[name, { name, exp }]])
}

export function bindsExtend(binds: Binds, name: string, exp: Exp): Binds {
  return new Map([...binds, [name, { name, exp }]])
}

export function bindsMerge(left: Binds, right: Binds): Binds {
  return new Map([...left, ...right])
}

export function bindsMapExp(binds: Binds, f: (exp: Exp) => Exp): Binds {
  return new Map([
    ...Array.from(binds.values()).map<[string, Bind]>(({ name, exp }) => [
      name,
      { name, exp: f(exp) },
    ]),
  ])
}

export function bindsTakeNames(binds: Binds, names: Set<string>): Binds {
  const newBinds = new Map()
  for (const [name, exp] of binds) {
    if (names.has(name)) {
      newBinds.set(name, exp)
    }
  }

  return newBinds
}
