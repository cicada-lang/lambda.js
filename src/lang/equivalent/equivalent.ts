import { type Value } from "../value/index.ts"
import { emptyCtx, equivalentInCtx } from "./equivalentInCtx.ts"

export function equivalent(left: Value, right: Value): boolean {
  return equivalentInCtx(emptyCtx(), left, right)
}
