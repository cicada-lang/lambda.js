export function setPop<A>(set: Set<A>): A {
  const { value } = set.values().next()
  if (value === undefined) {
    throw new Error(`[setPop] Set is empty.`)
  }

  set.delete(value)

  return value
}
