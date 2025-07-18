import { type Value } from "../value/index.ts"
import { emptyEquivalentCtx, equivalentInCtx } from "./equivalentInCtx.ts"

export function equivalent(left: Value, right: Value): boolean {
  return equivalentInCtx(emptyEquivalentCtx(), left, right)
}
