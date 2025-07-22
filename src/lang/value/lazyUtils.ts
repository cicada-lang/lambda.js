import { evaluate } from "../evaluate/index.ts"
import type * as Values from "./index.ts"
import { type Value } from "./index.ts"

export function lazyActive(lazy: Values.Lazy): Value {
  if (lazy.value !== undefined) {
    return lazy.value
  }

  return (lazy.value = evaluate(lazy.mod, lazy.env, lazy.exp))
}

export function lazyActiveDeep(value: Value): Value {
  if (value.kind === "Lazy") {
    return lazyActiveDeep(lazyActive(value))
  }

  return value
}
